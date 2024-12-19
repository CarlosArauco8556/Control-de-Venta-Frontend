import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GetProductsComponent } from '../../../products/pages/get-products/get-products.component';
import { DeleteProductComponent } from "../../../products/pages/delete-product/delete-product.component";
import { AddProductComponent } from "../../../products/pages/add-product/add-product.component";
import { UpdateProductComponent } from "../../../products/pages/update-product/update-product.component";
import { LocalStorageServiceService } from '../../../auth/services/local-storage-service.service';
import { GetSuppliesComponent } from '../../../supplies/pages/get-supplies/get-supplies.component';
import { AddSupplyComponent } from '../../../supplies/pages/add-supply/add-supply.component';
import { UpdateSupplyComponent } from '../../../supplies/pages/update-supply/update-supply.component';
import { DeleteSupplyComponent } from '../../../supplies/pages/delete-supply/delete-supply.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, GetProductsComponent, DeleteProductComponent, AddProductComponent, UpdateProductComponent, 
    GetSuppliesComponent, AddSupplyComponent, UpdateSupplyComponent, DeleteSupplyComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  private localStorageService: LocalStorageServiceService = inject(LocalStorageServiceService);
  
  isProductOpen: boolean;
  isUserOpen: boolean;
  isInvoicesOpen: boolean;
  isSuppliersOpen: boolean;
  isSuppliesOpen: boolean;
  currentComponent: string = '';
  isLogued: boolean = this.localStorageService.getVairbel('token') ? true : false;
  
  constructor() 
  {
    this.isProductOpen = false;
    this.isUserOpen = false;
    this.isInvoicesOpen = false;
    this.isSuppliersOpen = false;
    this.isSuppliesOpen = false;
  }

  loadComponent(component: string) {
    this.currentComponent = component;
  }

  openProductMenu()
  {
    this.isUserOpen = false;
    this.isInvoicesOpen = false;
    this.isSuppliersOpen = false;
    this.isSuppliesOpen = false;
    this.isProductOpen = !this.isProductOpen;
  }

  openUserMenu()
  {
    this.isProductOpen = false;
    this.isInvoicesOpen = false;
    this.isSuppliersOpen = false;
    this.isSuppliesOpen = false;
    this.isUserOpen = !this.isUserOpen;
  }

  openInvoicesMenu()
  {
    this.isProductOpen = false;
    this.isUserOpen = false;
    this.isSuppliersOpen = false;
    this.isSuppliesOpen = false;
    this.isInvoicesOpen = !this.isInvoicesOpen;
  }

  openSuppliersMenu()
  {
    this.isProductOpen = false;
    this.isUserOpen = false;
    this.isInvoicesOpen = false;
    this.isSuppliesOpen = false;
    this.isSuppliersOpen = !this.isSuppliersOpen;
  }

  openSuppliesMenu()
  {
    this.isProductOpen = false;
    this.isUserOpen = false;
    this.isInvoicesOpen = false;
    this.isSuppliersOpen = false;
    this.isSuppliesOpen = !this.isSuppliesOpen;
  }

}
