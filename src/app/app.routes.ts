import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'get-products',
        pathMatch: 'full',
        loadComponent: () => import('./products/pages/get-products/get-products.component').then(m => m.GetProductsComponent)
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'get-products'
    }

];
