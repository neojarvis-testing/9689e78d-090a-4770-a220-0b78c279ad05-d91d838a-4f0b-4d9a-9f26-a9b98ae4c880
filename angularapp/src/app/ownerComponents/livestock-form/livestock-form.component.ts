import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-livestock-form',
  templateUrl: './livestock-form.component.html',
  styleUrls: ['./livestock-form.component.css']
})
export class LivestockFormComponent implements OnInit {

  livestockForm: FormGroup;
  editMode = false;
  fileRequired = false;
  fileTouched = false;
  attachment: File | null = null;

  fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'species', label: 'Species', type: 'text' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'breed', label: 'Breed', type: 'text' },
    { name: 'healthCondition', label: 'Health Condition', type: 'text' },
    { name: 'location', label: 'Location', type: 'text' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Creating the reactive form with required validations
    // Each field is initialized with an empty value and proper validation rules
    this.livestockForm = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      breed: ['', Validators.required],
      healthCondition: ['', Validators.required],
      location: ['', Validators.required],
      vaccinationStatus: ['', Validators.required],
      attachment:['',Validators.required]
    });
  }

  /** 
   * Lifecycle hook called when the component is initialized 
   * Checks if there's an ID in the URL route 
   * If an ID is found, switches to edit mode
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
    }
  }

  /** 
   * Determines if a form control is invalid 
   * Checks whether the field is touched or dirty and invalid 
   * Returns true if validation errors are present
   */
  isInvalid(controlName: string): boolean {
    const control = this.livestockForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  /** 
   * Handles file input changes when a user uploads an attachment 
   * Tracks whether a file was selected and ensures it's required 
   * Updates the form control based on the user's input 
   */
  onFileChange(event: any): void {
    this.fileTouched = true;
    const file = event.target.files[0];
    this.attachment = file ? file : null;
    this.fileRequired = !this.attachment;
  }

  /** 
   * Navigates back to the livestock list page 
   * Used in edit mode when the user clicks "Back" 
   * Redirects to the appropriate route 
   */
  goBack(): void {
    this.router.navigate(['/livestock']); // Adjust based on your routing
  }

  /** 
   * Handles form submission when the user clicks "Add" or "Update" 
   * Validates all fields, ensuring no missing required values 
   * Displays an alert indicating whether the livestock was added or updated successfully
   * Resets the form after submission
   */
  onSubmit(): void {
    this.fileTouched = true;
    if (!this.attachment) {
      this.fileRequired = true;
    }

    if (this.livestockForm.invalid || this.fileRequired) {
      this.livestockForm.markAllAsTouched();
      return;
    }

    if (this.editMode) {
      alert('Livestock updated successfully!');
    } else {
      alert('Livestock added successfully!');
    }

    this.livestockForm.reset();
    this.attachment = null;
    this.fileRequired = false;
    this.fileTouched = false;
  }
}
