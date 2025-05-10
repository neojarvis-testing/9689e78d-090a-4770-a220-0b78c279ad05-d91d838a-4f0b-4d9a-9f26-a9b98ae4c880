import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Livestock } from 'src/app/models/livestock';
import { LivestockService } from 'src/app/services/livestock.service';

@Component({
  selector: 'app-livestock',
  templateUrl: './view-livestock.component.html',
  styleUrls: ['./view-livestock.component.css']
})

export class ViewLivestockComponent implements OnInit {
  livestocks: any = [];
  imageUrl!:SafeUrl;
  itemsPerPage = 3;
  currentPage = 1;
  searchQuery = '';
  filteredLivestocks: Livestock[] = [];
  livestockToDelete: Livestock | null = null;
  showModal = false;
  imageLink:string;

  constructor(private readonly router: Router, private readonly livestockService: LivestockService) { }

  ngOnInit(): void {
    this.fetchLivestocks();
  }

  fetchLivestocks(): void {
    this.livestockService.getAllLivestocks().subscribe((data) => {
      this.livestocks = data;
      this.filteredLivestocks = [...this.livestocks];
      this.renderTable();

    })
  }

  get paginatedLivestocks(): Livestock[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.filteredLivestocks.slice(start, end);
  }

  get totalPages(): number {
    return Math.max(Math.ceil(this.filteredLivestocks.length / this.itemsPerPage), 1);
  }

  filterLivestocks(): void {
    this.filteredLivestocks = this.livestocks.filter(livestock => livestock.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    this.currentPage = 1;
    this.renderTable();
  }

  renderTable(): void {
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    }
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

  confirmDelete(livestock: Livestock): void {
    this.livestockToDelete = livestock;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.livestockToDelete = null;
  }

  deleteLivestock(): void {
    if (this.livestockToDelete) {
      this.livestockService.deleteLivestock(this.livestockToDelete._id)
        .subscribe(() => {
          this.livestocks = this.livestocks.filter(livestock => livestock !== this.livestockToDelete);
          this.filterLivestocks();
          this.closeModal();
          this.imageUrl='';
        });
    }
  }

  editLivestock(livestock: Livestock): void {
    this.router.navigate(['/owner/livestock-form', livestock]);
  }
  viewAttachment(id:string):void{
      this.livestockService.getFileByLivestockId(id).subscribe(url=>{
        console.log(url);
        this.imageUrl=url;
      })
  }

  
}
