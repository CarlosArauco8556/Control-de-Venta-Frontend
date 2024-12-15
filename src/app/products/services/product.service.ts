import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GetProducts } from '../interfaces/getProducts';
import { firstValueFrom } from 'rxjs';
import { QueryParams } from '../interfaces/queryParams';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:5037/api/Product';
  public errors: string[] = [];
  private http = inject(HttpClient);

  async getAllProducts(queryParamsI: QueryParams): Promise<GetProducts[]>{
    try
    {
      const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGlkd20uY2wiLCJnaXZlbl9uYW1lIjoiYWRtaW4iLCJqdGkiOiIwMWEwODQ1MS00N2E3LTQwOGMtOGRiNC1iOWRmZDQ4Mzc4YjciLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3MzQyMjg5OTQsImV4cCI6MTczNDMxNTM5NCwiaWF0IjoxNzM0MjI4OTk0LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMCJ9.ShZFPIGhy4y2WBvn6EkeWX4FmzHqnQlrc3PltoXpxPQbArUf0PZ1nU6UOZ92poLULbRWBLdcA5ENbQ5y-RSMHA';
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
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
      const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGlkd20uY2wiLCJnaXZlbl9uYW1lIjoiYWRtaW4iLCJqdGkiOiIwMWEwODQ1MS00N2E3LTQwOGMtOGRiNC1iOWRmZDQ4Mzc4YjciLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3MzQyMjg5OTQsImV4cCI6MTczNDMxNTM5NCwiaWF0IjoxNzM0MjI4OTk0LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMCJ9.ShZFPIGhy4y2WBvn6EkeWX4FmzHqnQlrc3PltoXpxPQbArUf0PZ1nU6UOZ92poLULbRWBLdcA5ENbQ5y-RSMHA';
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const response = await firstValueFrom(this.http.post<GetProducts>(this.baseUrl, product, { headers: headers }));
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
      const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGlkd20uY2wiLCJnaXZlbl9uYW1lIjoiYWRtaW4iLCJqdGkiOiIwMWEwODQ1MS00N2E3LTQwOGMtOGRiNC1iOWRmZDQ4Mzc4YjciLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3MzQyMjg5OTQsImV4cCI6MTczNDMxNTM5NCwiaWF0IjoxNzM0MjI4OTk0LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMCJ9.ShZFPIGhy4y2WBvn6EkeWX4FmzHqnQlrc3PltoXpxPQbArUf0PZ1nU6UOZ92poLULbRWBLdcA5ENbQ5y-RSMHA';
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const response = await firstValueFrom(this.http.put<GetProducts>(`${this.baseUrl}/${id}`, product, { headers: headers}));
      return Promise.resolve(response);
    } catch (error){
      console.log("Error in UpdateProduct", error)
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);  
      return Promise.reject(error);
    }
  }

  async  deleteProduct(id: number): Promise<GetProducts>
  {
    try
    {
      const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGlkd20uY2wiLCJnaXZlbl9uYW1lIjoiYWRtaW4iLCJqdGkiOiIwMWEwODQ1MS00N2E3LTQwOGMtOGRiNC1iOWRmZDQ4Mzc4YjciLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3MzQyMjg5OTQsImV4cCI6MTczNDMxNTM5NCwiaWF0IjoxNzM0MjI4OTk0LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMCJ9.ShZFPIGhy4y2WBvn6EkeWX4FmzHqnQlrc3PltoXpxPQbArUf0PZ1nU6UOZ92poLULbRWBLdcA5ENbQ5y-RSMHA';
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const response = await firstValueFrom(this.http.delete<GetProducts>(`${this.baseUrl}/${id}`, { headers: headers}));
      return Promise.resolve(response);
    } catch (error){
      console.log("Error in DeleteProduct", error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }
}
