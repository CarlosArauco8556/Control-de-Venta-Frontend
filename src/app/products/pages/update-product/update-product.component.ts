import { Component, inject } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { GetProductsComponent } from '../get-products/get-products.component';
import { GetProducts } from '../../interfaces/getProducts';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'products-update-product',
  imports: [HttpClientModule, CommonModule, FormsModule, ReactiveFormsModule],
  providers: [ProductService, GetProductsComponent],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {
  productService: ProductService = inject(ProductService);
  getProductsComponent: GetProductsComponent = inject(GetProductsComponent);
  product: GetProducts = { id: 0, name: '', price: 0, discountPercentage: 0, stock: 0, stockMin: 0};
  errorMessages: string[] = [];
  error: boolean = false;
  productIsUpdated: boolean = false;
  forms: FormGroup = new FormGroup({});
  id: number = 0;

  constructor(private FormBuilder: FormBuilder){}

  ngOnInit(){
    this.createForm();
  }

  createForm(){
    this.forms = this.FormBuilder.group({
      id: ['', [Validators.required, Validators.min(0)]],
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      discountPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      stockMin: ['', [Validators.required, Validators.min(0)]]
    })
  }

  async updateProduct(){
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

      this.id = this.forms.value.id;

      const productUpdated = await this.productService.updateProduct(this.id, this.product);
      if(productUpdated !== null){
        this.productIsUpdated = true;
        this.getProductsComponent.getProducts();
        this.forms.reset();
      }
      setTimeout(() => {
        this.productIsUpdated = false;
      }, 3000);

    } catch (error){
      console.log("Error in UpdateProduct", error);
      this.handleServerError(error);
    }
  }

  handleFormErrors(){
    if(this.forms.controls['id'].invalid){
      this.errorMessages.push('ID is required');

      this.handleError();
    }
    if(this.forms.controls['name'].invalid){
      this.errorMessages.push('Name is required');
      
      this.handleError();
    }
    if(this.forms.controls['price'].invalid){
      this.errorMessages.push('Price is required and must be greater than 0');
      
      this.handleError();
    }
    if(this.forms.controls['discountPercentage'].invalid){
      this.errorMessages.push('Discount Percentage is required and must be between 0 and 100');
      
      this.handleError();
    }
    if(this.forms.controls['stock'].invalid){
      this.errorMessages.push('Stock is required and must be greater than 0');
      
      this.handleError();
    }
    if(this.forms.controls['stockMin'].invalid){
      this.errorMessages.push('Stock Min is required and must be greater than 0');
      
      this.handleError();
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
    this.handleError();
  }

  handleError(){
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 2000);
  }

}
