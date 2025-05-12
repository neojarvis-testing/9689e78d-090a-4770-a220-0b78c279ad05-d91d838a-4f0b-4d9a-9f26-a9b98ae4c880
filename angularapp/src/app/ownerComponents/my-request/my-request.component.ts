import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request.service';

interface Request {
  _id: string;
  feedId?: { feedName: string };
  status?: string;
  reason?:string
}

@Component({
  selector: 'app-my-request',
  templateUrl: './my-request.component.html',
  styleUrls: ['./my-request.component.css']
})
export class MyRequestComponent implements OnInit {
  requests: Request[] = [];
  searchQuery = '';
  itemsPerPage = 5;
  currentPage = 1;
  requestToDelete: Request | null = null;
  showModal = false; // Track modal visibility

  constructor(private readonly requestService: RequestService) {}

  ngOnInit(): void {
    this.fetchRequests();
  }

  fetchRequests(): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error("User ID not found.");
      return;
    }

    this.requestService.getRequestsByUserId(userId).subscribe(
      (data: Request[]) => {
        this.requests = data;
      },
      (error) => {
        console.error("Error fetching requests:", error);
      }
    );
  }

  filterRequests(): Request[] {
    return this.requests.filter(request =>
      request.feedId?.feedName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  get paginatedRequests(): Request[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filterRequests().slice(start, start + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.max(Math.ceil(this.filterRequests().length / this.itemsPerPage), 1);
  }

  prevPage(): void {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  confirmDelete(request: Request): void {
    this.requestToDelete = request;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.requestToDelete = null;
  }

  deleteRequest(): void {
    if (this.requestToDelete) {
      this.requestService.deleteRequest(this.requestToDelete._id).subscribe(
        () => {
          this.fetchRequests();
          this.closeModal();
        },
        (error) => {
          console.error("Error deleting request:", error);
        }
      );
    }
  }
}

