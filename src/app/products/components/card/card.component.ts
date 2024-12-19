import { Component, Input, inject } from '@angular/core';
import { GetProducts } from '../../interfaces/getProducts';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'products-card',
  imports: [CommonModule, HttpClientModule],
  providers: [ProductService],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']  // Corregido de 'styleUrl' a 'styleUrls'
})
export class CardComponent {

  @Input() product!: GetProducts;

  private productService: ProductService = inject(ProductService);

  constructor() {}

  addProductToInvoice(item: {productId: number, quantity: number}): void {
    this.productService.addProductToInvoice(item).subscribe({
      next: (response) => {
        console.log('Product added to invoice:', response);
      },
      error: (error) => {
        console.error('Error adding product to invoice:', error);
      }
    });
  }
}
