import { Component } from '@angular/core';
import { SupplierServiceService } from '../../services/supplier-service.service';

@Component({
  selector: 'app-get-suppliers',
  imports: [],
  templateUrl: './get-suppliers.component.html',
  styleUrl: './get-suppliers.component.css'
})
export class GetSuppliersComponent {
  suppliers: any[] = [];
  filteredSuppliers: any[] = [];
  filterName: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;

  constructor(private supplierService: SupplierServiceService) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.supplierService.getAllSuppliers().subscribe((data) => {
      this.suppliers = data;
      this.updatePagination();
    });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.suppliers.length / this.pageSize);
    this.filteredSuppliers = this.suppliers.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }

  onFilter(): void {
    if (this.filterName.trim()) {
      this.filteredSuppliers = this.suppliers.filter((s) =>
        s.name.toLowerCase().includes(this.filterName.toLowerCase())
      );
    } else {
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
