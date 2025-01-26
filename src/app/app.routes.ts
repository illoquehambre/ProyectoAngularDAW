import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { Page404Component } from './pages/page404/page404.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';

export const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: 'home', component: ProductListComponent},
    {path: 'newProduct', component: ProductFormComponent},
    {path: '**', component: Page404Component},
];
