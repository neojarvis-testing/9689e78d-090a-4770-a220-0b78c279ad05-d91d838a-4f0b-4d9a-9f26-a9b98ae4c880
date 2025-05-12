import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private readonly router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Check if token exists
    if (token) {
      const role=localStorage.getItem('currentuserRole')
      if(role==='admin'){
        return true;
      }
      else{
        return false
      }
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
  }

}