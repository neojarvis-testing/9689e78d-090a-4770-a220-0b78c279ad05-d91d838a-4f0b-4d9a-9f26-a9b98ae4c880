import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  showPasswordFields: boolean = false;

  constructor(private readonly authService: AuthService, private readonly router:Router,private readonly toastr:ToastrService) {} // Inject AuthService

  verifyEmail() {
    this.authService.verifyEmail(this.email).subscribe(response => {
      console.log(response.success);
      
      if(response.success===true){
        this.showPasswordFields = true;
      }
      else{
        this.toastr.error('Email not Exists')
      }
        
    });
  }

  resetPassword() {
    if (this.newPassword === this.confirmPassword) {
      this.authService.resetPassword(this.email, this.newPassword).subscribe(response => {
        this.toastr.success('Password reset Successfull')
        this.router.navigate(['/login'])
      });
    } else {
      this.toastr.error('Passwords do not match')
    }
  }

}
