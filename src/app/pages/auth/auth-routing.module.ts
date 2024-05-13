import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'error', loadChildren: () => import('./error/error.module').then(m => m.ErrorModule)},
    {path: 'access', loadChildren: () => import('./accessdenied/accessdenied.module').then(m => m.AccessdeniedModule)},
    {
      path: 'withoutplan',
      loadChildren: () => import('./withoutplan/withoutplan.module').then(m => m.WithoutplanModule)
    },
    {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
    {
      path: 'forgotpassword',
      loadChildren: () => import('./forgotpassword/forgotpassword.module').then(m => m.ForgotPasswordModule)
    },
    {path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)},
    {
      path: 'newpassword',
      loadChildren: () => import('./newpassword/newpassword.module').then(m => m.NewPasswordModule)
    },
    {
      path: 'verification',
      loadChildren: () => import('./verification/verification.module').then(m => m.VerificationModule)
    },
    {path: 'lockscreen', loadChildren: () => import('./lockscreen/lockscreen.module').then(m => m.LockScreenModule)},
    {path: '**', redirectTo: '/notfound'}
  ])],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
