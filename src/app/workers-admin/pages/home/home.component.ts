import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  isProductOpen: boolean;
  isUserOpen: boolean;
  isInvoicesOpen: boolean;
  isSuppliersOpen: boolean;
  
  constructor() 
  {
    this.isProductOpen = false;
    this.isUserOpen = false;
    this.isInvoicesOpen = false;
    this.isSuppliersOpen = false;
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
