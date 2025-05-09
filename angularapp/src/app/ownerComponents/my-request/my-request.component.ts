import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

@Component({
  selector: 'app-my-request',
  templateUrl: './my-request.component.html',
  styleUrls: ['./my-request.component.css']
})
export class MyRequestComponent implements OnInit {
  requests: any[] = [];
  searchQuery: string = '';
  itemsPerPage = 5;
  currentPage = 1;

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.fetchRequests();
  }

  // Fetch requests by logged-in user ID
  fetchRequests() {
    const userId = localStorage.getItem('userId'); 
    this.requestService.getRequestsByUserId(userId!).subscribe((data: any) => {
      this.requests = data;
    }, error => {
      console.error("Error fetching requests:", error);
    });
  }

  filterRequests(): any[] {
    return this.requests.filter(request =>
      request.feedId.feedName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  get paginatedRequests(): any[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filterRequests().slice(start, end);
  }

  get totalPages(): number {
    return Math.max(Math.ceil(this.filterRequests().length / this.itemsPerPage), 1);
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
}

