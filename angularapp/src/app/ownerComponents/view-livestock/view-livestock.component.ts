
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livestock } from 'src/app/models/livestock';

@Component({
  selector: 'app-livestock',
  templateUrl: './view-livestock.component.html',
  styleUrls: ['./view-livestock.component.css']
})

export class ViewLivestockComponent implements OnInit {
  livestocks: Livestock[] = [
    { _id: "1", name: "Bella", species: "Cow", age: 34, breed: "Holstein", healthCondition: "Healthy", location: "Farm xyz", vaccinationStatus: "Up to date", attachment: "attachment1"},
    { _id: "2", name: "Max", species: "Sheep", age: 6, breed: "Merino", healthCondition: "Needs attention", location: "Farm kl", vaccinationStatus: "Pending", attachment: "attachment2" },
    { _id: "3", name: "demo livestock", species: "demo species", age: 2, breed: "demo breed", healthCondition: "healthy", location: "demo location", vaccinationStatus: "Up to date", attachment: "attachment3" },
    { _id: "4", name: "Bella", species: "Cow", age: 34, breed: "Holstein", healthCondition: "Healthy", location: "Farm xyz", vaccinationStatus: "Up to date", attachment: "attachment1" },
    { _id: "5", name: "Max", species: "Sheep", age: 6, breed: "Merino", healthCondition: "Needs attention", location: "Farm kl", vaccinationStatus: "Pending", attachment: "attachment2"},
    { _id: "6", name: "demo livestock", species: "demo species", age: 2, breed: "demo breed", healthCondition: "healthy", location: "demo location", vaccinationStatus: "Up to date", attachment: "attachment3"}
  ];
  itemsPerPage = 3;
  currentPage = 1;
  searchQuery = '';
  filteredLivestocks: Livestock[] = [...this.livestocks];
  livestockToDelete: Livestock | null = null;
  showModal = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Initialize the table when the component is initialized
    // This function is called once the component is created
    this.renderTable();
  }

  get paginatedLivestocks(): Livestock[] {
    // Calculate the start and end indices for the current page
    // Return the slice of the filtered livestock array for the current page
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    console.log(this.filteredLivestocks.slice(start, end));
    
    return this.filteredLivestocks.slice(start, end);
  }

  get totalPages(): number {
    // Calculate the total number of pages based on the number of filtered livestock
    // Ensure there is at least one page
    return Math.max(Math.ceil(this.filteredLivestocks.length / this.itemsPerPage), 1);
  }

  filterLivestocks(): void {
    // Filter the livestock array based on the search query
    // Reset the current page to 1 and re-render the table
    this.filteredLivestocks = this.livestocks.filter(livestock => livestock.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    this.currentPage = 1;
    this.renderTable();
  }

  renderTable(): void {
    // Ensure the current page is within the valid range
    // Adjust the current page if it exceeds the total number of pages
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  prevPage(): void {
    // Navigate to the previous page if it exists
    // Re-render the table after changing the page
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderTable();
    }
  }

  nextPage(): void {
    // Navigate to the next page if it exists
    // Re-render the table after changing the page
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.renderTable();
    }
  }

  confirmDelete(livestock: Livestock): void {
    // Set the livestock to be deleted and show the confirmation modal
    // This function is called when the delete button is clicked
    this.livestockToDelete = livestock;
    this.showModal = true;
  }

  closeModal(): void {
    // Close the confirmation modal and reset the livestock to be deleted
    // This function is called when the cancel button is clicked
    this.showModal = false;
    this.livestockToDelete = null;
  }

  deleteLivestock(): void {
    // Delete the selected livestock from the array
    // Filter the livestock array and close the confirmation modal
    if (this.livestockToDelete) {
      this.livestocks = this.livestocks.filter(livestock => livestock !== this.livestockToDelete);
      this.filterLivestocks();
      this.closeModal();
    }
  }

  editLivestock(livestock: Livestock): void {
    // Navigate to the livestock form for editing the selected livestock
    // This function is called when the edit button is clicked
    this.router.navigate(['/owner/livestock-form',livestock]);
  }
}
