import { Component, inject } from '@angular/core';
import { GetSuppliesComponent } from '../../pages/get-supplies/get-supplies.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'supplies-dropdown-button',
  imports: [CommonModule],
  templateUrl: './dropdown-button.component.html',
  styleUrl: './dropdown-button.component.css'
})
export class DropdownButtonComponent {
  getSuppliesComponent: GetSuppliesComponent = inject(GetSuppliesComponent);
  isOpen: boolean = false;
  isOpen1: boolean = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string){
    console.log("Option selected: ", option);
    this.isOpen = false;
    this.performAction(option);
  }

  performAction(option: string) {
    switch (option) {
      case ' ----- ':
        console.log("No action selected");
        this.getSuppliesComponent.queryParams.orderBy = "";
        this.getSuppliesComponent.queryParams.IsDescending = null;
        this.getSuppliesComponent.getSupplies();      
        break;
      case 'Ascending':
        console.log("Ascending selected");
        this.getSuppliesComponent.queryParams.IsDescending = false;
        this.getSuppliesComponent.getSupplies();        
        break;
      case 'Descending':
        console.log("Descending selected");
        this.getSuppliesComponent.queryParams.IsDescending = true;
        this.getSuppliesComponent.getSupplies();
        break;
    }
  }

  toggleDropdown1() {
    this.isOpen1 = !this.isOpen1;
  }

  selectOption1(option: string){
    console.log("Option selected: ", option);
    this.isOpen1 = false;
    this.performAction1(option);
  }

  performAction1(option: string) {
    switch (option) {
      case 'productid':
        console.log("Productid selected");
        this.getSuppliesComponent.queryParams.orderBy = "productid";     
        break;
      case 'supplierid':
        console.log("Supplierid selected");
        this.getSuppliesComponent.queryParams.orderBy = "supplierid";       
        break;
      case 'orderdate':
        console.log("Orderdate selected");
        this.getSuppliesComponent.queryParams.orderBy = "orderdate";
        break;
      case 'deliverydate':
        console.log("Deliverydate selected");
        this.getSuppliesComponent.queryParams.orderBy = "deliverydate";
        break;
      case 'quantity':
        console.log("Quantity selected");
        this.getSuppliesComponent.queryParams.orderBy = "quantity";
        break;
      case 'totalprice':
        console.log("Totalprice selected");
        this.getSuppliesComponent.queryParams.orderBy = "totalprice";
        break;
      case 'productname':
        console.log("Productname selected");
        this.getSuppliesComponent.queryParams.orderBy = "productname";
        break;
      case 'suppliername':
        console.log("Suppliername selected");
        this.getSuppliesComponent.queryParams.orderBy = "suppliername";
        break;
    }
  }
}
