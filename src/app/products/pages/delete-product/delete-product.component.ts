import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { GetProductsComponent } from '../get-products/get-products.component';
import { GetProducts } from '../../interfaces/getProducts';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'products-delete-product',
  imports: [HttpClientModule, CommonModule],
  providers: [ProductService, GetProductsComponent],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent {
  public productService: ProductService = inject(ProductService)
  public getProductsComponent: GetProductsComponent = inject(GetProductsComponent);
  public product: GetProducts = { name: '', price: 0, discountPercentage: 0, stock: 0, stockMin: 0 };

  deleteProduct(input: string)
  {
    const id = parseInt(input);
    this.productService.deleteProduct(id);
    this.getProductsComponent.getProducts();
  }
}
