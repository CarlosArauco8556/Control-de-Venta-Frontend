import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SupplyService } from '../../services/supply.service';
import { GetSuppliesComponent } from '../get-supplies/get-supplies.component';
import { GetSupply } from '../../interfaces/getSupply';
import { GetSupplies } from '../../interfaces/getSupplies';

@Component({
  selector: 'supplies-delete-supply',
  imports: [HttpClientModule, CommonModule],
  providers: [SupplyService, GetSuppliesComponent, FormsModule],
  templateUrl: './delete-supply.component.html',
  styleUrl: './delete-supply.component.css'
})
export class DeleteSupplyComponent {
  public supplyService: SupplyService = inject(SupplyService)
  public getSuppliesComponent: GetSuppliesComponent = inject(GetSuppliesComponent);
  public getSupply: GetSupply = {message: "", supply: {orderDate: new Date(), deliveryDate: new Date(), quantity: 0, totalPrice: 0, productId: 0, productName: "", supplyId: 0, supplyName: ""}};
  public supply: GetSupplies = {orderDate: new Date(), deliveryDate: new Date(), quantity: 0, totalPrice: 0, productId: 0, productName: "", supplyId: 0, supplyName: ""};
  public isModalVisible: boolean = false;
  public supplyIsDeleted: boolean = false;
  public error: boolean = false;
  public errorMessage: string[] = [];
  

  async deleteSupply(input: string)
  {
    try
    {
      const supplyId = parseInt(input);
      const supplyDeleted = await this.supplyService.deleteSupply(supplyId);

      this.getSupply = {
        message: supplyDeleted.message,
        supply: supplyDeleted.deletedSupply,
      };

      this.getSuppliesComponent.getSupplies();
      if (supplyDeleted !== null) this.supplyIsDeleted = true;
      console.log(this.supplyIsDeleted);
      setTimeout(() => {
        this.supplyIsDeleted = false;
        console.log(this.supplyIsDeleted);
      }, 3000); // Wait 4 seconds
      this.error = false;
    } catch (error){
      console.log("Error in DeleteSupply", error);
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

  parsedDate(date: any): string {
    return this.getSuppliesComponent.parsedDate(date);
  }
}
