import {Component} from '@angular/core';
import {LoadingService} from "../../shared/services/loading.service";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {

  loading: boolean = false;
  constructor(
    private loadingService: LoadingService
  ) {
    this.loadingService.get().subscribe(loading => this.loading = loading);
  }
}
