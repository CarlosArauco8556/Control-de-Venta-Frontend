import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvoiceServiceService } from '../../services/invoice-service.service';

@Component({
  selector: 'app-create-invoice',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
  providers: [InvoiceServiceService],
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {
  private invoiceService: InvoiceServiceService = inject(InvoiceServiceService);
  errorMessage: string[] = [];
  successMessage: string = '';
  forms!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.CreateForm();
  }

  CreateForm() {
    this.forms = this.formBuilder.group({
      name: [''],
      rut: [''],
      email: [''],
      phoneNumber: [''],
      description: [''],
      paymentMethod: [1], // Asegúrate de que el valor por defecto sea un número
    });
  }
  
  onSubmit() {
    console.log('Formulario:', this.forms.value);
  
    // Convierte explícitamente el valor de paymentMethod a número
    const formData = this.forms.value;
    formData.paymentMethod = +formData.paymentMethod;  // Usar el operador unario '+' para convertir a número
  
    // Llamada al servicio
    this.invoiceService.createInvoice(formData).then(
      (response: any) => {
        console.log('Factura creada correctamente:', response);
      }
    ).catch(
      (error: any) => {
        console.error('Error al crear la factura:', error);
      }
    );
  }
  
}
