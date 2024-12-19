import { Component, inject } from '@angular/core';
import { SupplyService } from '../../services/supply.service';
import { GetSuppliesComponent } from '../get-supplies/get-supplies.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AddSupply } from '../../interfaces/addSupply';
import { GetSupply } from '../../interfaces/getSupply';

@Component({
  selector: 'supplies-update-supply',
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [SupplyService, GetSuppliesComponent],
  templateUrl: './update-supply.component.html',
  styleUrl: './update-supply.component.css'
})
export class UpdateSupplyComponent {
  supplyService: SupplyService = inject(SupplyService);
  getSuppliesComponent: GetSuppliesComponent = inject(GetSuppliesComponent); 
  supply: AddSupply = {orderDate: new Date(), deliveryDate: new Date(), quantity: 0, productId: 0, supplierId: 0};
  getSupply: GetSupply = {message: "", supply: {orderDate: new Date(), deliveryDate: new Date(), quantity: 0, totalPrice: 0, productId: 0, productName: "", supplyId: 0, supplyName: ""}};
  supplyIsUpdated: boolean = false;
  forms: FormGroup = new FormGroup({});
  error: boolean = false;
  errorMessages: string[] = [];
  id: number = 0;

  constructor(private FormBuilder: FormBuilder) {}

  ngOnInit(){
    this.createForm();
  }

  createForm(){
    this.forms = this.FormBuilder.group({
      id: ['', [Validators.required, Validators.min(0)]],
      orderDate: ['', [Validators.required]],
      deliveryDate: ['', [Validators.required]],
      quantity: ['', [Validators.required, Validators.min(0)]],
      productId: ['', [Validators.required, Validators.min(0)]],
      supplierId: ['', [Validators.required, Validators.min(0)]]
    });
  }

  async updateSupply()
  {
    this.errorMessages = [];

    if(this.forms.invalid){
      this.handleFormErrors();
      return;
    }
    try
    {
      this.supply.orderDate = this.forms.value.orderDate;
      this.supply.deliveryDate = this.forms.value.deliveryDate;
      this.supply.quantity = this.forms.value.quantity;
      this.supply.productId = this.forms.value.productId;
      this.supply.supplierId = this.forms.value.supplierId;

      this.id = this.forms.value.id;

      const supplyUpdated = await this.supplyService.updateSupply(this.id, this.supply);
      if (supplyUpdated !== null){
        this.supplyIsUpdated = true;
        this.getSuppliesComponent.getSupplies();
        this.forms.reset();
      }      
      setTimeout(() => {
        this.supplyIsUpdated = false;
      }, 3000);
    } catch (error){
      console.log("Error in UpdateSupply", error);
      this.handleServerError(error);
    }
  }

  handleFormErrors() {
    if (this.forms.controls['id'].invalid) {
      this.errorMessages.push('Supply Id to be updated is required and must be greater than 0');

      this.handlerError();
    }
    if(this.forms.controls['orderDate'].invalid){
      this.errorMessages.push('Order date is required');

      this.handlerError();
    }
    if(this.forms.controls['deliveryDate'].invalid){
      this.errorMessages.push('Delivery date is required');

      this.handlerError();
    }
    if(this.forms.controls['quantity'].invalid){
      this.errorMessages.push('Quantity is required and must be greater than 0');

      this.handlerError();
    }
    if(this.forms.controls['productId'].invalid){
      this.errorMessages.push('Product Id is required and must be greater than 0');

      this.handlerError();
    }
    if(this.forms.controls['supplierId'].invalid){
      this.errorMessages.push('Supplier Id is required and must be greater than 0');

      this.handlerError();
    }
  }

  handleServerError(error: any){
    console.error('Server error:', error);

    if (error.error?.errors) {
      this.errorMessages = [
        ...(Object.values(error.error.errors)
          .flat()
          .filter((e): e is string => typeof e === 'string'))
      ];
    } else if (typeof error.error === 'string') {
      this.errorMessages.push(error.error);
    } else {
      this.errorMessages.push('An unexpected error occurred. Please try again later.');
    }
    this.handlerError();
  }

  handlerError()
  {
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 2000);
  }
}