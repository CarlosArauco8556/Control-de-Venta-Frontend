import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { GetProductsComponent } from '../get-products/get-products.component';
import { GetProducts } from '../../interfaces/getProducts';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'products-delete-product',
  imports: [HttpClientModule, CommonModule],
  providers: [ProductService, GetProductsComponent, FormsModule],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent {
  public productService: ProductService = inject(ProductService)
  public getProductsComponent: GetProductsComponent = inject(GetProductsComponent);
  public product: GetProducts = { name: '', price: 0, discountPercentage: 0, stock: 0, stockMin: 0 };
  public isModalVisible: boolean = false;
  public productIsDeleted: boolean = false;
  public error: boolean = false;
  public errorMessage: string[] = [];
  

  async deleteProduct(input: string)
  {
    try
    {
      const productId = parseInt(input);
      const productDeleted = await this.productService.deleteProduct(productId);
      this.product = productDeleted;
      this.getProductsComponent.getProducts();
      if (productDeleted !== null) this.productIsDeleted = true;
      console.log(this.productIsDeleted);
      setTimeout(() => {
        this.productIsDeleted = false;
        console.log(this.productIsDeleted);
      }, 3000); // Wait 4 seconds
      this.error = false;
    } catch (error){
      console.log("Error in DeleteProduct", error);
      this.handleServerError(error);
    }
  }

  private handleServerError(error: any) {
    console.error('Server error:', error);

    if (error.error?.errors) {
      this.errorMessage = [
        ...(Object.values(error.error.errors)
          .flat()
          .filter((e): e is string => typeof e === 'string'))
      ];
    } else if (typeof error.error === 'string') {
      this.errorMessage.push(error.error);
    } else {
      this.errorMessage.push('An unexpected error occurred. Please try again later.');
    }
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 2000); // Wait 3 seconds
  }

  getLastError(): string
  {
    return this.errorMessage[this.errorMessage.length - 1];
  }
}