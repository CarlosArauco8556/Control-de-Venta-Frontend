import { Component } from '@angular/core';
import { SupplierServiceService } from '../../services/supplier-service.service';
import { Supplier } from '../../interfaces/supplier';

@Component({
  selector: 'app-add-supplier',
  imports: [],
  templateUrl: './add-supplier.component.html',
  styleUrl: './add-supplier.component.css'
})
export class AddSupplierComponent {
  supplier = { name: '', rut: '', email: '', phone: '' };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private supplierService: SupplierServiceService) {}

  onSubmit(): void {
    this.supplierService.getAllSuppliers().subscribe((suppliers) => {
      const existingSupplier = suppliers.find((s: { name: string; }) => s.name === this.supplier.name);

      if (existingSupplier) {
        this.errorMessage = 'El suministrador ya existe.';
        this.successMessage = '';
        return;
      }

      this.supplierService.addSupplier(this.supplier).subscribe(() => {
        this.successMessage = 'Suministrador añadido correctamente.';
        this.errorMessage = '';
        this.supplier = { name: '', rut: '', email: '', phone: '' }; // Limpiar formulario
      });
    });
  }
}
