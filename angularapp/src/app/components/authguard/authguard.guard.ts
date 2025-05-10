import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Check if token exists
    if (token) {
      return true; // Allow navigation
    } else {
      this.router.navigate(['/login']); // Redirect to login if not authenticated
      return false;
    }
  }

}

