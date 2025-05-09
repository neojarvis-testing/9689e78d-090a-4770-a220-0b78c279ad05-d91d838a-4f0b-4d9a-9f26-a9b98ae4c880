import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livestock } from 'src/app/models/livestock';
import { LivestockService } from 'src/app/services/livestock.service';

@Component({
  selector: 'app-livestock-form',
  templateUrl: './livestock-form.component.html',
  styleUrls: ['./livestock-form.component.css']
})
export class LivestockFormComponent implements OnInit {

  livestockForm!: FormGroup;
  livestockId!: string;
  editMode = false;
  vaccinationOptions = ['Vaccinated', 'Not Vaccinated', 'Up to Date'];
  fileRequired = false;
  fileTouched = false;
  attachment: File | null = null;
  livestocks: Livestock[] = [];

  fields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'species', label: 'Species', type: 'text' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'breed', label: 'Breed', type: 'text' },
    { name: 'healthCondition', label: 'Health Condition', type: 'text' },
    { name: 'location', label: 'Location', type: 'text' },
  ];

  constructor(
    private fb: FormBuilder,
    private livestockService: LivestockService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Creating the reactive form with required validations
    this.livestockForm = this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      breed: ['', Validators.required],
      healthCondition: ['', Validators.required],
      location: ['', Validators.required],
      vaccinationStatus: ['', Validators.required], // Keeping this separate from fields array
      attachment: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.livestockId = this.route.snapshot.params['id']; // Fixed issue
    if (this.livestockId) {
      this.editMode = true;
      this.loadLivestockDetails();
    }
  }

  loadLivestockDetails(): void {
    this.livestockService.getLivestockById(this.livestockId).subscribe(livestock => {
      this.livestockForm.patchValue(livestock);
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.livestockForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onFileChange(event: any): void {
    this.fileTouched = true;
    const file = event.target.files[0];
    this.attachment = file ? file : null;
    this.livestockForm.patchValue({ attachment: this.attachment });
    this.fileRequired = !this.attachment;
  }

  goBack(): void {
    this.router.navigate(['/livestock']);
  }

  onSubmit(): void {
    this.fileTouched = true;
    if (!this.attachment) {
      this.fileRequired = true;
    }
  
    if (this.livestockForm.invalid || this.fileRequired) {
      this.livestockForm.markAllAsTouched();
      return;
    }
  
    const formData = new FormData();
    
    // Append form fields
    Object.keys(this.livestockForm.value).forEach((key) => {
      formData.append(key, this.livestockForm.value[key]);
    });
  
    // Append file separately
    if (this.attachment) {
      formData.append('attachment', this.attachment);
    }
  
    if (this.editMode) {
      this.livestockService.updateLivestock(this.livestockId, formData).subscribe(() => {
        this.router.navigate(['/livestock-list']);
      });
    } else {
      this.livestockService.addLivestock(formData).subscribe(() => {
        this.router.navigate(['/livestock-list']);
      });
    }
  
    this.livestockForm.reset();
    this.attachment = null;
    this.fileRequired = false;
    this.fileTouched = false;
  }
}