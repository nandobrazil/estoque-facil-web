import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ModelsComponent} from "./models/models.component";
import {ModelComponent} from "./model/model.component";

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'Listagem' },
    component: ModelsComponent,
  },
  {
    path: 'new',
    data: { breadcrumb: 'Novo modelo' },
    component: ModelComponent,
  },
  {
    path: ':id',
    data: { breadcrumb: 'Editar modelo' },
    component: ModelComponent,
  },
  {path: '**', redirectTo: '/notfound'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelRoutingModule { }
