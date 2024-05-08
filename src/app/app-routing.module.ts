import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LandingModule)
  },
  { path: 'panel', loadChildren: () => import('./pages/panel/panel.module').then(m => m.PanelModule) },
  { path: 'auth', data: { breadcrumb: 'Auth' }, loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'notfound', loadChildren: () => import('./pages/notfound/notfound.module').then(m => m.NotfoundModule) },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
