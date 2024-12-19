import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../interfaces/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierServiceService {

  private apiUrl = 'http://localhost:5037/suppliers';

  constructor(private http: HttpClient) {}

  getAllSuppliers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  addSupplier(supplier: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, supplier);
  }

  updateSupplier(name: string, supplier: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${name}`, supplier);
  }

  deleteSupplier(name: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${name}`);
  }
}
