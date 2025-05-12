import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {
  requests: any[] = [];
  filteredRequests: any[] = [];
  searchQuery: string = '';
  itemsPerPage = 5;
  currentPage = 1;

  constructor(private readonly requestService: RequestService) {}

  ngOnInit(): void {
    this.fetchRequests();
  }

  // Fetch all requests
  fetchRequests() {
    this.requestService.getAllRequests().subscribe((data) => {
      this.requests = data;
      this.filteredRequests = [...this.requests];
    }, error => {
      console.error("Error fetching requests:", error);
    });
  }

  // Filters requests based on the feed name search
  filterRequests(): void {
    this.filteredRequests = this.requests.filter(request =>
      request.feedId?.feedName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.currentPage = 1;
    this.renderTable();
  }

  // Ensures pagination stays within valid limits
  renderTable(): void {
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
  }

  get paginatedRequests(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredRequests.slice(start, end);
  }

  get totalPages(): number {
    return Math.max(Math.ceil(this.filteredRequests.length / this.itemsPerPage), 1);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderTable();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.renderTable();
    }
  }

  // Update request status (Approve/Reject)
  updateRequestStatus(requestId: string, status: string): void {
    this.requestService.updateRequest(requestId, { status }).subscribe(() => {
      this.fetchRequests();
    }, error => {
      console.error("Error updating request:", error);
    });
  }
}
