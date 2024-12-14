import { Component, inject } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ProductService } from '../../services/product.service';
import { GetProducts } from '../../interfaces/getProducts';
import { HttpClientModule } from '@angular/common/http';
import { QueryParams } from '../../interfaces/queryParams';
import { CommonModule } from '@angular/common';
import { ChangePageButtonsComponent } from '../../components/change-page-buttons/change-page-buttons.component';

@Component({
  selector: 'products-get-products',
  imports: [CardComponent, HttpClientModule, CommonModule, ChangePageButtonsComponent],
  providers: [ProductService],
  templateUrl: './get-products.component.html',
  styleUrl: './get-products.component.css'
})
export class GetProductsComponent {
  private productService: ProductService = inject(ProductService);
  public products: GetProducts[] = [];
  public queryParamsI: QueryParams = {textFilter: "", sortByPrice: "", IsDescending: null, pageNumber: 1, pageSize: 10};


  ngOnInit(){
    this.getProducts();
  }

  getProducts()
  {
    this.productService.getAllProducts(this.queryParamsI).then((products) => {;
      this.products = products; 
      console.log("Products obtained: ", this.products);
    });
  }
}
