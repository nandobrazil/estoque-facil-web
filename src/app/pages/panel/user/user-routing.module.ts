import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {UserComponent} from "./user/user.component";

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Listagem' },
    component: UsersComponent,
  },
  {
    path: 'new',
    data: { breadcrumb: 'Novo usuário' },
    component: UserComponent,
  },
  {
    path: ':id',
    data: { breadcrumb: 'Editar usuário' },
    component: UserComponent,
  },
  {path: '**', redirectTo: '/notfound'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
