import { Injectable } from '@angular/core';
import { AuthServiceService } from '../Auth/services/auth-service.service';
import { CanActivate, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthServiceService, private router: Router) {}

  canActivate(): boolean {
    if (!this.auth.isAdmin()) {
      this.router.navigate(['/not-authorized']);
      return false;
    }
    return true;
  }
}
