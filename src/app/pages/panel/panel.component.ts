import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {
  shrink = false;
  menuOpened = false;

  constructor(
    private router: Router
  ) {
    this.router.events.subscribe(() => {
      this.menuOpened = false;
    });
  }
}
