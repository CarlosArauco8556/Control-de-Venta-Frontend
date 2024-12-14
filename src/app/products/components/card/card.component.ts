import { Component, Input } from '@angular/core';
import { GetProducts } from '../../interfaces/getProducts';

@Component({
  selector: 'products-card',
  imports: [],
  providers: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() product: GetProducts;

  constructor(){
    this.product = {
      name: "",
      price: 0,
      discountPercentage: 0,
      stock: 0,
      stockMin: 0,
    }
  }
}
