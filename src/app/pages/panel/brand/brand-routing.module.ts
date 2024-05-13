import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrandComponent} from "./brand/brand.component";
import {BrandsComponent} from "./brands/brands.component";

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Listagem' },
    component: BrandsComponent,
  },
  {
    path: 'new',
    data: { breadcrumb: 'Nova marca' },
    component: BrandComponent,
  },
  {
    path: ':id',
    data: { breadcrumb: 'Editar marca' },
    component: BrandComponent,
  },
  {path: '**', redirectTo: '/notfound'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
