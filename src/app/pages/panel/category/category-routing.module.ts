import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoriesComponent} from "./categories/categories.component";
import {CategoryComponent} from "./category/category.component";

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Listagem' },
    component: CategoriesComponent,
  },
  {
    path: 'new',
    data: { breadcrumb: 'Nova categoria' },
    component: CategoryComponent,
  },
  {
    path: ':id',
    data: { breadcrumb: 'Editar categoria' },
    component: CategoryComponent,
  },
  {path: '**', redirectTo: '/notfound'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
