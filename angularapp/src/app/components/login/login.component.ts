import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string = ''; // Store backend error message

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentuserRole');
    localStorage.removeItem('username');

    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) // Email validation
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8) // Password validation
      ]]
    });
    const data=JSON.parse(localStorage.getItem('currentuserFarm'));
    if(data){
      this.loginForm.patchValue({email:data.email})
    }
    
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token); // Store authentication token
          localStorage.setItem('username', response.username); // Store username
          localStorage.setItem('currentuserRole',response.role);
          localStorage.removeItem('currentuserFarm');
          this.router.navigate(['/home-page']); // Redirect after successful login
        },
        error: (err) => {
          console.error('Login failed', err);
          this.errorMessage = err.error.message || 'Invalid email or password!';
        }
      });
    } else {
      this.loginForm.markAllAsTouched(); // Trigger validation messages
    }
  }
}