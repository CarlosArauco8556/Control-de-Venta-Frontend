import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private roles: string[] = ['worker', 'admin'];

  getUserRole(): string {
    return localStorage.getItem('userRole') || 'worker'; // 'worker' por defecto
  }

  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }

  isWorker(): boolean {
    return this.getUserRole() === 'worker';
  }

}
