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
      {
        path: 'category',
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Categorias' },
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
      },
      {
        path: 'brand',
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Marcas' },
        loadChildren: () => import('./brand/brand.module').then(m => m.BrandModule)
      },
      {
        path: 'model',
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Modelos' },
        loadChildren: () => import('./model/model.module').then(m => m.ModelModule)
      },
      {
        path: 'product',
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Produtos' },
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
      },
      {
        path: 'user',
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Usuários' },
        loadChildren: () => import('./user/user.module').then(m => m.UserModule)
      },
      {
        path: 'settings',
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Configurações da Conta' },
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule)
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
