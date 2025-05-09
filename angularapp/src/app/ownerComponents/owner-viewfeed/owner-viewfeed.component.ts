import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-owner-viewfeed',
  templateUrl: './owner-viewfeed.component.html',
  styleUrls: ['./owner-viewfeed.component.css']
})
export class OwnerViewfeedComponent implements OnInit {
  feeds: any[] = [];
  searchQuery: string = '';
  itemsPerPage = 5;
  currentPage = 1;
  selectedFeed: any | null = null;
  showRequestModal = false;
  requestData = { quantity: null };

  constructor(private feedService: FeedService, private requestService: RequestService) {}

  ngOnInit(): void {
    // this.fetchFeeds();
  }

  // fetchFeeds() {
  //   this.feedService.getAllFeeds().subscribe((data: any) => {
  //     this.feeds = data;
  //   }, error => {
  //     console.error("Error fetching feeds:", error);
  //   });
  // }

  filterFeeds() {
    return this.feeds.filter(feed =>
      feed.feedName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  get paginatedFeeds(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filterFeeds().slice(start, end);
  }

  get totalPages(): number {
    return Math.max(Math.ceil(this.filterFeeds().length / this.itemsPerPage), 1);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  openRequestForm(feed: any): void {
    this.selectedFeed = feed;
    this.showRequestModal = true;
  }

  closeRequestModal(): void {
    this.showRequestModal = false;
    this.selectedFeed = null;
    this.requestData.quantity = null;
  }

  submitRequest(): void {
    if (!this.requestData.quantity) {
      alert('Please enter quantity.');
      return;
    }
    
    const requestPayload = {
      feedId: this.selectedFeed._id,
      quantity: this.requestData.quantity
    };

    this.requestService.addRequest(requestPayload).subscribe(() => {
      alert('Request submitted successfully!');
      this.closeRequestModal();
    }, error => {
      console.error("Error submitting request:", error);
    });
  }
}
