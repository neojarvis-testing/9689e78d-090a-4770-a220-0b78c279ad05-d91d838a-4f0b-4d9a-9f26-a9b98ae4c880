import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Authguard1Guard implements CanActivate {
  constructor(private router: Router) { }
  canActivate():boolean{
      const token = localStorage.getItem('token'); // Check if token exists
      if (token) {
        const role=localStorage.getItem('currentuserRole')
        if(role==='user'){
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
