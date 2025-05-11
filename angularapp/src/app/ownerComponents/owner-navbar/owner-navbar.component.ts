import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-navbar',
  templateUrl: './owner-navbar.component.html',
  styleUrls: ['./owner-navbar.component.css']
})
export class OwnerNavbarComponent implements OnInit {
  userName:string;
  showModal: boolean = false; // State for logout modal

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    // Any initialization logic can go here
   this.userName=(localStorage.getItem('username'));
   console.log(this.userName);
   
  }
  openModal(): void {
    this.showModal = true;
  }

  // Close modal without logging out
  closeModal(): void {
    this.showModal = false;
  }

  // Confirm logout and navigate to login page
  confirmLogout(): void {
    this.showModal = false;
    this.router.navigate(['/login']); // Redirects to login page
  }

}
