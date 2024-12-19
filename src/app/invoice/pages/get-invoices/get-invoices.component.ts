import { Component, OnInit, inject } from '@angular/core';
import { InvoiceServiceService } from '../../services/invoice-service.service';
import { HttpClientModule } from '@angular/common/http';
import { Invoice } from '../../interfaces/Invoice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-invoices',
  imports: [HttpClientModule, CommonModule],
  providers: [InvoiceServiceService],
  templateUrl: './get-invoices.component.html',
  styleUrls: ['./get-invoices.component.css'] 
})
export class GetInvoicesComponent implements OnInit { 

  private invoiceService: InvoiceServiceService = inject(InvoiceServiceService);
  public invoices: Invoice[] = [];

  ngOnInit() {
    this.getInvoices();
  }

  getInvoices() {
    try {
      this.invoiceService.getInvoice().then((invoices) => {
        this.invoices = invoices; 
        console.log("Invoices obtained: ", this.invoices);
      });
    } catch (error) {
      console.log("Error in getInvoices: ", error);
    }
  }

}
