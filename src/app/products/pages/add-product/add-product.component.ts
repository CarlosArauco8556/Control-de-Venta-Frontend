import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { GetProducts } from '../../interfaces/getProducts';
import { GetProductsComponent } from '../get-products/get-products.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'products-add-product',
  imports: [HttpClientModule, FormsModule, CommonModule, ReactiveFormsModule],
  providers: [ProductService, GetProductsComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{
  productService: ProductService = inject(ProductService);
  getProductsComponent: GetProductsComponent = inject(GetProductsComponent); 
  product: GetProducts = {id: 0, name: 'string', price: 0, discountPercentage: 0, stock: 0, stockMin: 0};
  productIsAdded: boolean = false;
  forms: FormGroup = new FormGroup({});
  error: boolean = false;
  errorMessages: string[] = [];

  constructor(private FormBuilder: FormBuilder) {}

  ngOnInit(){
    this.createForm();
  }

  createForm(){
    this.forms = this.FormBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      discountPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      stockMin: ['', [Validators.required, Validators.min(0)]]
    });
  }

  async addProduct()
  {
    this.errorMessages = [];

    if(this.forms.invalid){
      this.handleFormErrors();
      return;
    }
    try
    {
      this.product.name = this.forms.value.name;
      this.product.price = this.forms.value.price;
      this.product.discountPercentage = this.forms.value.discountPercentage;
      this.product.stock = this.forms.value.stock;
      this.product.stockMin = this.forms.value.stockMin;

      const productAdded = await this.productService.addProduct(this.product);
      if (productAdded !== null){
        this.productIsAdded = true;
        this.getProductsComponent.getProducts();
        this.forms.reset();
      }      
      setTimeout(() => {
        this.productIsAdded = false;
      }, 3000);
    } catch (error){
      console.log("Error in AddProduct", error);
      this.handleServerError(error);
    }
  }

  handleFormErrors() {
    if(this.forms.controls['name'].invalid){
      this.errorMessages.push('Name is required');

      this.handlerError();
    }
    if(this.forms.controls['price'].invalid){
      this.errorMessages.push('Price is required and must be greater than 0');

      this.handlerError();
    }
    if(this.forms.controls['discountPercentage'].invalid){
      this.errorMessages.push('Discount Percentage is required and must be between 0 and 100');

      this.handlerError();
    }
    if(this.forms.controls['stock'].invalid){
      this.errorMessages.push('Stock is required and must be greater than 0');

      this.handlerError();
    }
    if(this.forms.controls['stockMin'].invalid){
      this.errorMessages.push('Stock Min is required and must be greater than 0');

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
