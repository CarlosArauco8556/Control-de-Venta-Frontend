import { Routes } from '@angular/router';
import { authGuardGuard } from './auth/guards/auth-guard.guard';

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
        path: 'home',
        loadComponent: () => import('./workers-admin/pages/home/home.component').then(m => m.HomeComponent),
        canActivate: [authGuardGuard],
        children: [{
            path: 'get-workers',
            loadComponent: () => import('./products/pages/get-products/get-products.component').then(m => m.GetProductsComponent)
        }],
    },
    {
        path: 'auth-register',
        loadComponent: () => import('./auth/pages/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'get-products',
        pathMatch: 'full',
        loadComponent: () => import('./products/pages/get-products/get-products.component').then(m => m.GetProductsComponent)
    },
    {
        path: 'add-product',
        pathMatch: 'full',
        loadComponent: () => import('./products/pages/add-product/add-product.component').then(m => m.AddProductComponent)
    },
    {
        path: 'delete-product',
        pathMatch: 'full',
        loadComponent: () => import('./products/pages/delete-product/delete-product.component').then(m => m.DeleteProductComponent)
    },
    {
        path: 'update-product/:id',
        pathMatch: 'full',
        loadComponent: () => import('./products/pages/update-product/update-product.component').then(m => m.UpdateProductComponent)
    },
    {
        path: '**',
        redirectTo: 'auth-home'
    }
];
