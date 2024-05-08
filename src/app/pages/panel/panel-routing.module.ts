import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PanelComponent} from "./panel.component";
import {AuthGuard} from "../../shared/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: PanelComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Painel' },
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Métricas e Dados' },
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]
  },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule {
}
