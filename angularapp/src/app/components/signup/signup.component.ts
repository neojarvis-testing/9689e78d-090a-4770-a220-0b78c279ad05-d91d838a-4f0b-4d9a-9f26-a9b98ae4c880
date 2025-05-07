import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  signupForm!: FormGroup;
  showModal: boolean = false;
  successMessage: string = ''; // Store backend message

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.signupForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) // Email validation
      ]],
      mobile: ['', [
        Validators.required,
        Validators.pattern(/^\d{10}$/) // Mobile must be exactly 10 digits
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8), // Minimum 8 characters
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) 
      ]],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Password match validator
  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  // Submit form and send data to AuthService
  onSubmit(): void {
    if (this.signupForm.valid) {
      const userData: User = this.signupForm.value; // Map form data to User model
      
      this.authService.registerUser(userData).subscribe({
        next: (response) => {
          this.successMessage = response.message; // Get success message from backend
          this.showModal = true; // Show success modal
        },
        error: (err) => {
          console.error('Signup failed', err);
          alert('Signup failed! Please try again.');
        }
      });
    } else {
      this.signupForm.markAllAsTouched(); // Trigger validation messages
    }
  }

  // Close modal and navigate to another page
  closeModal(): void {
    this.showModal = false;
    this.router.navigate(['/home']); // Navigate after closing modal
  }
  validateNumber(event: KeyboardEvent): void {
    const key = event.key;
    if (!/^[0-9]$/.test(key)) {  // Only allows digits 0-9
      event.preventDefault(); // Blocks input of any non-numeric character
    }
  }
}

