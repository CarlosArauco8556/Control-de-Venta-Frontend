import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Invoice } from '../interfaces/Invoice';
import { firstValueFrom } from 'rxjs';
import { InvoiceDto } from '../interfaces/InvoiceDto';
import { LocalStorageServiceService } from '../../auth/services/local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceServiceService {

  private baseUrl = 'http://localhost:5037';
  private errors: string[] = [];
  private http: HttpClient = inject(HttpClient);
  private localStorageService: LocalStorageServiceService = inject(LocalStorageServiceService);
  private token: string = this.localStorageService.getVairbel('token') || '';

  async createInvoice(invoiceDto: InvoiceDto): Promise<Invoice> {
    try {
      const response = await firstValueFrom(this.http.post<Invoice>(`${this.baseUrl}/api/Invoice`, invoiceDto));
      return Promise.resolve(response);
    } catch (error) {
      console.log('Error en createInvoice', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }

  async getInvoice(): Promise<Invoice[]> {
    try {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
      const response = await firstValueFrom(this.http.get<Invoice[]>(`${this.baseUrl}/api/Invoice/`, {headers: headers}));
      return Promise.resolve(response);
    } catch (error) {
      console.log('Error en getInvoice', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }
}
