import { Component, OnInit } from '@angular/core';
import { FeedService } from '../../services/feed.service';
import { RequestService } from '../../services/request.service';
import { LivestockService } from '../../services/livestock.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-owner-viewfeed',
  templateUrl: './owner-viewfeed.component.html',
  styleUrls: ['./owner-viewfeed.component.css']
})
export class OwnerViewfeedComponent implements OnInit {
  feeds: any[] = [];
  livestockList: any[] = [];
  searchQuery: string = '';
  itemsPerPage = 5;
  currentPage = 1;
  selectedFeed: any  = null;
  selectedLivestock: any  = null;
  showRequestModal = false;
  requestData = { quantity: null, livestockId: null, userId: null };

  constructor(
    private readonly feedService: FeedService,
    private readonly requestService: RequestService,
    private readonly livestockService: LivestockService,
    private readonly router: Router,
    private readonly toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchFeeds();
    this.fetchLivestock();
    this.loadUserId();
  }

  fetchFeeds() {
    this.feedService.getAllFeeds().subscribe((data: any) => {
      this.feeds = data;
    }, error => {
      console.error("Error fetching feeds:", error);
    });
  }

  fetchLivestock() {
    const userId = localStorage.getItem('userId');

    if (!userId) {
        console.error("User ID not found in localStorage.");
        return;
    }

    this.livestockService.getLivestockByUserId(userId).subscribe((data: any) => {
        this.livestockList = data;
    }, error => {
        console.error("Error fetching livestock:", error);
    });
}


  loadUserId() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error("User ID not found in localStorage.");
      return;
    }
    this.requestData.userId = userId;
  }

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
    this.requestData.livestockId = null;
  }

  submitRequest(): void {
    if (!this.requestData.quantity || !this.requestData.livestockId || !this.requestData.userId) {
      this.toastr.error('Please select livestock, enter quantity, and ensure user ID is available.')
      return;
    }

    const requestPayload = {
      feedId: this.selectedFeed._id,
      livestockId: this.requestData.livestockId,
      userId: this.requestData.userId,
      quantity: this.requestData.quantity,
      status: 'PENDING' // Default status when submitting
    };

    this.requestService.addRequest(requestPayload).subscribe(() => {
      this.toastr.success('Request submitted successfully!')
      this.closeRequestModal();
      this.router.navigate(['/owner/my-request']); // Redirect to My Requests Page
    }, error => {
      console.error("Error submitting request:", error);
    });
  }
}
