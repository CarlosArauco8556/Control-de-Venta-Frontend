import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth-home',
        pathMatch: 'full',
        loadComponent: () => import('./auth/pages/auth-home/auth-home.component').then(m => m.AuthHomeComponent)
    },
    {
        path: 'auth-login',
        loadComponent: () => import('./auth/pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'auth-register',
        loadComponent: () => import('./auth/pages/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: '**',
        redirectTo: 'auth-home'
    }
];
