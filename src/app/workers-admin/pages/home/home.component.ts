import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { GetProductsComponent } from '../../../products/pages/get-products/get-products.component';
import { DeleteProductComponent } from "../../../products/pages/delete-product/delete-product.component";
import { AddProductComponent } from "../../../products/pages/add-product/add-product.component";
import { UpdateProductComponent } from "../../../products/pages/update-product/update-product.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, GetProductsComponent, DeleteProductComponent, AddProductComponent, UpdateProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  isProductOpen: boolean;
  isUserOpen: boolean;
  isInvoicesOpen: boolean;
  isSuppliersOpen: boolean;
  currentComponent: string = '';
  
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
