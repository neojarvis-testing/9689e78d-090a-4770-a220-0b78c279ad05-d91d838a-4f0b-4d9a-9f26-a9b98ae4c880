import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  vaccinationOptions = ['Vaccinated', 'Not Vaccinated', 'Up to date'];
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
    private route: ActivatedRoute,
    private toastr:ToastrService
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
    });
  }

  ngOnInit(): void {
    this.livestockId = this.route.snapshot.params['id'];
    if (this.livestockId) {
      this.editMode = true;
      this.loadLivestockDetails();
    }
  }

  loadLivestockDetails(): void {
    this.livestockService.getLivestockById(this.livestockId).subscribe(livestock => {
      this.livestockId=livestock._id
      this.livestockForm.patchValue({
        name: livestock.name,
        species: livestock.species,
        breed: livestock.breed,
        age: livestock.age,
        healthCondition: livestock.healthCondition,
        location: livestock.location,
        vaccinationStatus: livestock.vaccinationStatus
      });
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
    this.fileRequired = !this.attachment;
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
    
    let formData = new FormData();
    const formValues = this.livestockForm.value;

    Object.keys(formValues).forEach(key => {
      formData.append(key, formValues[key]);
    })

    if (this.attachment) {
      formData.append('attachment', this.attachment);
    }
    const userId = localStorage.getItem('userId');
    formData.append('userId', userId!);

    console.log(this.editMode);
    if (this.editMode) {
      console.log(Object.entries(formData));
      this.livestockService.updateLivestock(this.livestockId, formData).subscribe(() => {
        this.toastr.success('Livestock Updated Successfully')
        this.router.navigate(['/owner/view-livestock']);
      });
    } else {
      this.livestockService.addLivestock(formData).subscribe(() => {
        console.log(formData);
        this.toastr.success('Livestock Added Successfully')
        this.router.navigate(['/owner/view-livestock']);
      });
    }

    this.livestockForm.reset();
    this.attachment = null;
    this.fileRequired = false;
    this.fileTouched = false;
  }
  goBack():void{
    this.router.navigate(['/owner/view-livestock'])
  }
}

