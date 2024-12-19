import { Component, inject, Input } from '@angular/core';
import { GetSupplies } from '../../interfaces/getSupplies';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GetSuppliesComponent } from '../../pages/get-supplies/get-supplies.component';

@Component({
  selector: 'supplies-card',
  imports: [HttpClientModule, CommonModule],
  providers: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  getSuppliesComponent: GetSuppliesComponent = inject(GetSuppliesComponent);
  @Input() supply: GetSupplies;

  constructor(){
    this.supply = {
      orderDate: new Date(),
      deliveryDate: new Date(),
      quantity:    0,
      totalPrice: 0,
      productId: 0,
      productName: "",
      supplyId: 0,
      supplyName: "",  
    }
  }

  parsedDate(date: any): string {
    return this.getSuppliesComponent.parsedDate(date);
  }
}
