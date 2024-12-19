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
  baseUrl1 = 'http://localhost:5037/api/ProductManagement';
  public errors: string[] = [];
  private http = inject(HttpClient);

  async getAllProducts(queryParamsI: QueryParams): Promise<GetProducts[]>{
    try
    {
      const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGlkd20uY2wiLCJnaXZlbl9uYW1lIjoiYWRtaW4iLCJqdGkiOiI0ZDM0NTRlZC01NjRiLTQ5NWItOTEwNi05MGNlNWU5NDU2Y2UiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3MzQ1NzM1NzIsImV4cCI6MTczNDY1OTk3MiwiaWF0IjoxNzM0NTczNTcyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMCJ9.XeurqhtESkfljlnulW-1cjE_KjHHRL2aEbv6vZoan57VuNAEhfB33Hmld9qazf7SLHNGTDh9o4oq0nyFRPBVvw';
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
      const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGlkd20uY2wiLCJnaXZlbl9uYW1lIjoiYWRtaW4iLCJqdGkiOiI0ZDM0NTRlZC01NjRiLTQ5NWItOTEwNi05MGNlNWU5NDU2Y2UiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3MzQ1NzM1NzIsImV4cCI6MTczNDY1OTk3MiwiaWF0IjoxNzM0NTczNTcyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMCJ9.XeurqhtESkfljlnulW-1cjE_KjHHRL2aEbv6vZoan57VuNAEhfB33Hmld9qazf7SLHNGTDh9o4oq0nyFRPBVvw';
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
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
      const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGlkd20uY2wiLCJnaXZlbl9uYW1lIjoiYWRtaW4iLCJqdGkiOiI0ZDM0NTRlZC01NjRiLTQ5NWItOTEwNi05MGNlNWU5NDU2Y2UiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3MzQ1NzM1NzIsImV4cCI6MTczNDY1OTk3MiwiaWF0IjoxNzM0NTczNTcyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMCJ9.XeurqhtESkfljlnulW-1cjE_KjHHRL2aEbv6vZoan57VuNAEhfB33Hmld9qazf7SLHNGTDh9o4oq0nyFRPBVvw';
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const response = await firstValueFrom(this.http.put<GetProducts>(`${this.baseUrl1}/${id}`, product, { headers: headers}));
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
      const token = localStorage.getItem('token') || 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGlkd20uY2wiLCJnaXZlbl9uYW1lIjoiYWRtaW4iLCJqdGkiOiI0ZDM0NTRlZC01NjRiLTQ5NWItOTEwNi05MGNlNWU5NDU2Y2UiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE3MzQ1NzM1NzIsImV4cCI6MTczNDY1OTk3MiwiaWF0IjoxNzM0NTczNTcyLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjUwMCJ9.XeurqhtESkfljlnulW-1cjE_KjHHRL2aEbv6vZoan57VuNAEhfB33Hmld9qazf7SLHNGTDh9o4oq0nyFRPBVvw';
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const response = await firstValueFrom(this.http.delete<GetProducts>(`${this.baseUrl1}/${id}`, { headers: headers}));
      return Promise.resolve(response);
    } catch (error){
      console.log("Error in DeleteProduct", error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }
}
