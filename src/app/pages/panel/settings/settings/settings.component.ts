import { Component } from '@angular/core';
import {AuthService} from "../../../../shared/services/auth.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

  user: any;
  constructor(
    private authService: AuthService
  ) {
    // this.user = this.authService.getTokenPayload();
    // console.log('User', this.user)
  }
}
