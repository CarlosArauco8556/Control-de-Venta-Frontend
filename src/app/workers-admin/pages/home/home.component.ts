import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GetProductsComponent } from '../../../products/pages/get-products/get-products.component';
import { DeleteProductComponent } from "../../../products/pages/delete-product/delete-product.component";
import { AddProductComponent } from "../../../products/pages/add-product/add-product.component";
import { UpdateProductComponent } from "../../../products/pages/update-product/update-product.component";
import { LocalStorageServiceService } from '../../../auth/services/local-storage-service.service';
import { CreateInvoiceComponent } from "../../../invoice/pages/create-invoice/create-invoice.component";
import { GetInvoicesComponent } from "../../../invoice/pages/get-invoices/get-invoices.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, GetProductsComponent, DeleteProductComponent, AddProductComponent, UpdateProductComponent, CreateInvoiceComponent, GetInvoicesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  private localStorageService: LocalStorageServiceService = inject(LocalStorageServiceService);
  
  isProductOpen: boolean;
  isUserOpen: boolean;
  isInvoicesOpen: boolean;
  isSuppliersOpen: boolean;
  currentComponent: string = '';
  isLogued: boolean = this.localStorageService.getVairbel('token') ? true : false;
  
  constructor() 
  {
    this.isProductOpen = false;
    this.isUserOpen = false;
    this.isInvoicesOpen = false;
    this.isSuppliersOpen = false;
  }

  loadComponent(component: string) {
    this.currentComponent = component;
  }

  openProductMenu()
  {
    this.isUserOpen = false;
    this.isInvoicesOpen = false;
    this.isSuppliersOpen = false;
    this.isProductOpen = !this.isProductOpen;
  }

  openUserMenu()
  {
    this.isProductOpen = false;
    this.isInvoicesOpen = false;
    this.isSuppliersOpen = false;
    this.isUserOpen = !this.isUserOpen;
  }

  openInvoicesMenu()
  {
    this.isProductOpen = false;
    this.isUserOpen = false;
    this.isSuppliersOpen = false;
    this.isInvoicesOpen = !this.isInvoicesOpen;
  }

  openSuppliersMenu()
  {
    this.isProductOpen = false;
    this.isUserOpen = false;
    this.isInvoicesOpen = false;
    this.isSuppliersOpen = !this.isSuppliersOpen;
  }

}
