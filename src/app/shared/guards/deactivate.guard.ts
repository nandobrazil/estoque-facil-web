import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../services/auth.service";
import {ConfirmationService} from "primeng/api";
import {Observable} from "rxjs";
import {LoadingService} from "../services/loading.service";

@Injectable({ providedIn: 'root' })
export class DeactivateGuard {

  constructor(
    private confirmationService: ConfirmationService,
    private loadingService: LoadingService
  ) { }

  canDeactivate(): Observable<boolean> | boolean {
    return new Observable<boolean>(observer => {
      let skipDeactivate = this.loadingService.getForceNavigation();
      console.log('skipDeactivate', skipDeactivate)
      if (skipDeactivate) {
        return observer.next(true);
      }
      this.confirmationService.confirm({
        message: 'Deseja realmente sair dessa página? Todas as alterações não salvas serão perdidas.',
        acceptLabel: 'Confirmar',
        rejectLabel: 'Cancelar',
        accept: () => { observer.next(true); observer.complete(); },
        reject: () => { observer.next(false); observer.complete(); }
      });
    });
  }
}
