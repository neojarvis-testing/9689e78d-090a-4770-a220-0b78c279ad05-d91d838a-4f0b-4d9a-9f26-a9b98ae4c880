
import { Component, OnInit } from '@angular/core';
import { Feed } from 'src/app/models/feed';



@Component({
  selector: 'app-view-feed',
  templateUrl: './view-feed.component.html',
  styleUrls: ['./view-feed.component.css']
})
export class ViewFeedComponent implements OnInit {
  feeds: Feed[] = [
    { id: 2, feedName: "agrofeed updated", type: "feed xtreme", description: "value for money", unit: "kg", pricePerUnit: "34" },
    { id: 3, feedName: "demo name", type: "demo type", description: "demo description", unit: "Kg", pricePerUnit: "34" },
    { id: 4, feedName: "grow fast", type: "grower", description: "high protein", unit: "Kg", pricePerUnit: "40" },
    { id: 1, feedName: "starter", type: "crumbled", description: "best in class", unit: "kg", pricePerUnit: "56" },
    { id: 5, feedName: "agrofeed updated", type: "feed xtreme", description: "value for money", unit: "kg", pricePerUnit: "34" },
    { id: 6, feedName: "demo name", type: "demo type", description: "demo description", unit: "Kg", pricePerUnit: "34" },
    { id: 7, feedName: "grow fast", type: "grower", description: "high protein", unit: "Kg", pricePerUnit: "40" }
  ];
  itemsPerPage = 3;
  currentPage = 1;
  searchQuery = '';
  filteredFeeds: Feed[] = [...this.feeds];
  feedToDelete: Feed | null = null;
  showModal = false;

  constructor() { }

  ngOnInit(): void {
    this.renderTable();
  }

  // Returns the feeds to be displayed on the current page
  get paginatedFeeds(): Feed[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredFeeds.slice(start, end);
  }

  // Calculates the total number of pages based on the number of filtered feeds
  get totalPages(): number {
    return Math.max(Math.ceil(this.filteredFeeds.length / this.itemsPerPage), 1);
  }

  // Filters the feeds based on the search query and resets the current page to 1
  filterFeeds(): void {
    this.filteredFeeds = this.feeds.filter(feed => feed.feedName.toLowerCase().includes(this.searchQuery.toLowerCase()));
    this.currentPage = 1;
    this.renderTable();
  }

  // Ensures the current page is within the valid range after filtering or pagination changes
  renderTable(): void {
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  // Moves to the previous page if not on the first page
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderTable();
    }
  }

  // Moves to the next page if not on the last page
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.renderTable();
    }
  }

  // Sets the feed to be deleted and shows the confirmation modal
  confirmDelete(feed: Feed): void {
    this.feedToDelete = feed;
    this.showModal = true;
  }

  // Closes the confirmation modal without deleting the feed
  closeModal(): void {
    this.showModal = false;
    this.feedToDelete = null;
  }

  // Deletes the selected feed and updates the filtered feeds list
  deleteFeed(): void {
    if (this.feedToDelete) {
      this.feeds = this.feeds.filter(feed => feed !== this.feedToDelete);
      this.filterFeeds();
      this.closeModal();
    }
  }
}

