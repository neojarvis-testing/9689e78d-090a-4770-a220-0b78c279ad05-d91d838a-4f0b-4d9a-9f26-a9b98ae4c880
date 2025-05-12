import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string = ''; // Store backend error message

  constructor( private readonly fb: FormBuilder, private readonly authService: AuthService, private readonly router: Router,private readonly toastr:ToastrService) { }

  ngOnInit(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentuserRole');
    localStorage.removeItem('username');

    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]+@([\w-]+\.)+[\w-]{2,4}$/) // Email validation
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
        // Store authentication details in localStorage
        if(response.message!=='Incorrect password'|| 'User not found'){
          localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.username);
        localStorage.setItem('currentuserRole', response.role);
        localStorage.setItem('userId', response.id);
        localStorage.setItem('userEmail', this.loginForm.value.email); // Store user email for reference
        
        localStorage.removeItem('currentuserFarm'); // Remove temp user data

        this.toastr.success('Login successful!', 'Success'); // Show success notification
        this.router.navigate(['/home-page']); // Redirect after successful login
        }
        else{
          this.toastr.error(response.message)
        }
      },
      error: (errMessage) => {
        console.error('Login failed:', errMessage); // Logs only the message
      
        this.toastr.error('Invalid Email and password'); // ✅ Displays only the extracted error message
      }
    });
  } else {
    this.loginForm.markAllAsTouched(); // Trigger validation messages
    this.toastr.warning('Please fill in valid details before submitting', 'Warning');
  }
}
 }