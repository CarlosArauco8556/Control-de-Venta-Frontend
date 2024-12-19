import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageServiceService } from '../../auth/services/local-storage-service.service';
import { QueryParams } from '../interfaces/queryParams';
import { GetSupplies } from '../interfaces/getSupplies';
import { firstValueFrom } from 'rxjs';
import { AddSupply } from '../interfaces/addSupply';
import { GetSupply } from '../interfaces/getSupply';

@Injectable({
  providedIn: 'root'
})
export class SupplyService {
  private localStorageService: LocalStorageServiceService = inject(LocalStorageServiceService);
  baseUrl = 'http://localhost:5037/api/Supply';
  baseUrl1 = 'http://localhost:5037/api/SupplyManagement';
  public errors: string[] = [];
  private http = inject(HttpClient);
  private token: string = this.localStorageService.getVairbel('token') || '';

  async getAllSupplies(params: QueryParams): Promise<GetSupplies[]>
  {
    try{
      const headers = new HttpHeaders().set('Authorization', `Bearer $(this.token)`);
      let queryParams = new HttpParams()
        if (params.textFilter) queryParams = queryParams.set('textFilter', params.textFilter);
        if (params.orderBy) queryParams  = queryParams.set('orderBy', params.orderBy);
        if (params.IsDescending !== null && params.IsDescending !== undefined) {
          queryParams = queryParams.set('IsDescending', params.IsDescending.toString());
        }
        if (params.pageNumber) queryParams = queryParams.set('pageNumber', params.pageNumber.toString());
        if (params.pageSize) queryParams = queryParams.set('pageSize', params.pageSize.toString());

      const response = await firstValueFrom(this.http.get<GetSupplies[]>(this.baseUrl, { params: queryParams, headers: headers }));
      return Promise.resolve(response);
    } catch(error){
      console.log("Error in GetAllSupplies", error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }

  async addSupply(supply: AddSupply): Promise<GetSupply>
  {
    try{
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      const response = await firstValueFrom(this.http.post<GetSupply>(this.baseUrl1, supply, { headers: headers }));
      return Promise.resolve(response);
    } catch(error){
      console.log("Error in AddSupply", error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }

  async updateSupply(id: number, supply: AddSupply): Promise<GetSupply>
  {
    try{
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      const response = await firstValueFrom(this.http.put<GetSupply>(`${this.baseUrl1}/${id}`, supply, { headers: headers }));
      return Promise.resolve(response);
    } catch(error){
      console.log("Error in UpdateSupply", error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }

  async deleteSupply(id: number): Promise<GetSupply>
  {
    try{
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      const response = await firstValueFrom(this.http.delete<GetSupply>(`${this.baseUrl1}/${id}`, { headers: headers }));
      return Promise.resolve(response);
    } catch(error){
      console.log("Error in DeleteSupply", error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }
}
