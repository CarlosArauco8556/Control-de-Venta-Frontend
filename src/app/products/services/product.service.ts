import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetProducts } from '../interfaces/getProducts';
import { firstValueFrom, Observable } from 'rxjs';
import { QueryParams } from '../interfaces/queryParams';
import { LocalStorageServiceService } from '../../auth/services/local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private localStorageService: LocalStorageServiceService = inject(LocalStorageServiceService);
  baseUrl = 'http://localhost:5037/api/Product';
  baseUrl1 = 'http://localhost:5037/api/ProductManagement';
  baseUrl2 = 'http://localhost:5037/api/InvoiceItems';
  public errors: string[] = [];
  private http = inject(HttpClient);
  private token: string = this.localStorageService.getVairbel('token') || '';

  async getAllProducts(queryParamsI: QueryParams): Promise<GetProducts[]>{
    try
    {
      console.log(this.token);
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      let queryParams = new HttpParams()
        if (queryParamsI.textFilter) queryParams = queryParams.set('textFilter', queryParamsI.textFilter);
        if (queryParamsI.sortByPrice) queryParams = queryParams.set('sortByPrice', queryParamsI.sortByPrice);
        if (queryParamsI.IsDescending !== null && queryParamsI.IsDescending !== undefined) {
          queryParams = queryParams.set('IsDescending', queryParamsI.IsDescending.toString());
        }
        if (queryParamsI.pageNumber) queryParams = queryParams.set('pageNumber', queryParamsI.pageNumber.toString());
        if (queryParamsI.pageSize) queryParams = queryParams.set('pageSize', queryParamsI.pageSize.toString());

      const response = await firstValueFrom(this.http.get<GetProducts[]>(this.baseUrl, { params: queryParams, headers: headers }));
      return Promise.resolve(response); 
    } catch (error){
      console.log("Error in GetAllProducts", error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }

  async addProduct(product: GetProducts): Promise<GetProducts>
  {
    try
    {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      const response = await firstValueFrom(this.http.post<GetProducts>(this.baseUrl1, product, { headers: headers }));
      return Promise.resolve(response);
    } catch (error){
      console.log("Error in AddProduct", error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }

  async updateProduct(id: number, product: GetProducts): Promise<GetProducts>
  {
    try
    {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      const response = await firstValueFrom(this.http.put<GetProducts>(`${this.baseUrl1}/${id}`, product, { headers: headers}));
      return Promise.resolve(response);
    } catch (error){
      console.log("Error in UpdateProduct", error)
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);  
      return Promise.reject(error);
    }
  }

  async deleteProduct(id: number): Promise<GetProducts>
  {
    try
    {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      const response = await firstValueFrom(this.http.delete<GetProducts>(`${this.baseUrl1}/${id}`, { headers: headers}));
      return Promise.resolve(response);
    } catch (error){
      console.log("Error in DeleteProduct", error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }

  addProductToInvoice(item: { productId: number, quantity: number }): Observable<void> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(`${this.baseUrl2}/${item.productId}/${item.quantity}`, {}, {
        headers: headers,
        withCredentials: true  // Asegúrate de que las cookies se envíen con la solicitud
    });
 }
 

}
