import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../services/auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard {

  constructor(
    public authService: AuthService,
    public router: Router
) { }

  canActivate(): boolean {
    return true;
    const authenticated = this.authService.isLogged();
    if (!authenticated) {
      this.router.navigate(['/auth/login']).then(() => this.authService.signOut());
    }
    return authenticated;
  }
}
