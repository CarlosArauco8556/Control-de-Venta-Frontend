import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { GetProductsComponent } from '../../pages/get-products/get-products.component';

@Component({
  selector: 'products-dropdown-button',
  imports: [CommonModule],
  templateUrl: './dropdown-button.component.html',
  styleUrl: './dropdown-button.component.css'
})
export class DropdownButtonComponent {
  public getProductsComponent: GetProductsComponent = inject(GetProductsComponent);
  isOpen: boolean = false;

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
        this.getProductsComponent.queryParamsI.sortByPrice = "";
        this.getProductsComponent.queryParamsI.IsDescending = null;
        this.getProductsComponent.getProducts();      
        break;
      case 'Ascending':
        console.log("Ascending selected");
        this.getProductsComponent.queryParamsI.sortByPrice = "Price";
        this.getProductsComponent.queryParamsI.IsDescending = false;
        this.getProductsComponent.getProducts();        
        break;
      case 'Descending':
        console.log("Descending selected");
        this.getProductsComponent.queryParamsI.sortByPrice = "Price";
        this.getProductsComponent.queryParamsI.IsDescending = true;
        this.getProductsComponent.getProducts();
        break;
    }
  }
}
