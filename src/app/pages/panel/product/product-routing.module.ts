import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {ProductComponent} from "./product/product.component";

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Listagem' },
    component: ProductsComponent,
  },
  {
    path: 'new',
    data: { breadcrumb: 'Novo produto' },
    component: ProductComponent,
  },
  {
    path: ':id',
    data: { breadcrumb: 'Editar produto' },
    component: ProductComponent,
  },
  {path: '**', redirectTo: '/notfound'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
