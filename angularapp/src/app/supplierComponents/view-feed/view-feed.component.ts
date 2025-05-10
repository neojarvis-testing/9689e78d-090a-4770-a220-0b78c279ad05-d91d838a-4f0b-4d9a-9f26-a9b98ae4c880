import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feed } from 'src/app/models/feed';
import { FeedService } from 'src/app/services/feed.service';


@Component({
  selector: 'app-view-feed',
  templateUrl: './view-feed.component.html',
  styleUrls: ['./view-feed.component.css']
})
export class ViewFeedComponent implements OnInit {
  feeds: Feed[] = [];
  itemsPerPage = 3;
  currentPage = 1;
  searchQuery = '';
  filteredFeeds: Feed[] = [];
  feedToDelete: any;
  showModal = false;

  constructor(private readonly feedService: FeedService,private readonly  router:Router) { }

  ngOnInit(): void {
    this.loadFeeds();
  }

  // Load feeds from the service
  loadFeeds(): void {
    this.feedService.getAllFeeds().subscribe(
      (data: Feed[]) => {
        this.feeds = data;
        this.filteredFeeds = [...this.feeds];
        this.renderTable();
      },
      (error) => {
        console.error('Error fetching feeds', error);
      }
    );
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
      this.feedService.deleteFeed(this.feedToDelete._id).subscribe(
        () => {
          this.feeds = this.feeds.filter(feed => feed !== this.feedToDelete);
          this.filterFeeds();
          this.closeModal();
        },
        (error) => {
          console.error('Error deleting feed', error);
        }
      );
    }
  }
  confirmUpdate(id:number):void{
    this.router.navigate(['/supplier/add-feed',id])
  }
}
