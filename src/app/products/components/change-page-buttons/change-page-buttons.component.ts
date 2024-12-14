import { Component, inject } from '@angular/core';
import { GetProductsComponent } from '../../pages/get-products/get-products.component';

@Component({
  selector: 'products-change-page-buttons',
  imports: [],
  providers: [],
  templateUrl: './change-page-buttons.component.html',
  styleUrl: './change-page-buttons.component.css'
})
export class ChangePageButtonsComponent {
  public getProductsComponent: GetProductsComponent = inject(GetProductsComponent);
  public currentPage: number = 1;

  nextPage()
  {
    if(this.getProductsComponent.products.length == 10)
    {
      this.currentPage++;
      this.getProductsComponent.queryParamsI.pageNumber = this.currentPage;
      this.getProductsComponent.getProducts();
    }
  }
  

  previousPage()
  { 
  if(this.currentPage > 1)
  {
    this.currentPage--;
    this.getProductsComponent.queryParamsI.pageNumber = this.currentPage;
    this.getProductsComponent.getProducts();
  }
  }

}
