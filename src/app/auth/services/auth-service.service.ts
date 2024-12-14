import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Auth } from '../interfaces/Auth';
import { LoginDto } from '../interfaces/LoginDto';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private baseUrl = 'http://localhost:5037';
  private errors: string[] = [];
  private http: HttpClient = inject(HttpClient);

  async login(loginDto: LoginDto): Promise<Auth> {
    try {
      const response = await firstValueFrom(this.http.post<Auth>(`${this.baseUrl}/api/Auth/login`, loginDto));
      return Promise.resolve(response);
    } catch (error) {
      console.log('Error en login', error);
      let e = error as HttpErrorResponse;
      this.errors.push(e.message);
      return Promise.reject(error);
    }
  }
}
