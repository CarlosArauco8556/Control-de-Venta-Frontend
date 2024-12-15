import { Component, inject } from '@angular/core';
import { GetProductsComponent } from '../../pages/get-products/get-products.component';

@Component({
  selector: 'products-search-bar',
  imports: [],
  providers: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  public getProductsComponent: GetProductsComponent = inject(GetProductsComponent);

  filterProducts(searchImput: string)
  {
    this.getProductsComponent.queryParamsI.textFilter = searchImput;
    this.getProductsComponent.getProducts();
  }

  resetFilter()
  {
    console.log("Resetting filter");
    this.getProductsComponent.queryParamsI.textFilter = "";
    this.getProductsComponent.getProducts();
  }
}
