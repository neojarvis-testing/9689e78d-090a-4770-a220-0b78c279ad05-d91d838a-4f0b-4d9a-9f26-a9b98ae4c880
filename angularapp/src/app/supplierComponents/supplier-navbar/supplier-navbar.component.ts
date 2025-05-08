import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-navbar',
  templateUrl: './supplier-navbar.component.html',
  styleUrls: ['./supplier-navbar.component.css']
})
export class SupplierNavbarComponent implements OnInit {

  showModal: boolean = false; // State for logout modal

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Any initialization logic can go here
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
