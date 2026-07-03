import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list';
import { ProductFormComponent } from './components/product-form/product-form';

/**
 * Application routes:
 * - /products — Product listing (default)
 * - /products/add — Add new product form
 * - /products/edit/:id — Edit existing product form
 */
export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductListComponent },
  { path: 'products/add', component: ProductFormComponent },
  { path: 'products/edit/:id', component: ProductFormComponent },
  { path: '**', redirectTo: 'products' }
];
