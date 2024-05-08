import {Inject, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfirmationService, MessageService} from 'primeng/api';
import {environment} from "../../../environments/environment";

export abstract class BaseService {

  urlBase = '';
  http: HttpClient;
  confirmationSrv: ConfirmationService;
  messageSrv: MessageService;

  protected constructor(
    public url: string,
    @Inject(Injector) injector: Injector
  ) {
    this.urlBase = `${environment.apiUrl}/${this.url}`;
    this.http = injector.get(HttpClient);
    this.confirmationSrv = injector.get(ConfirmationService);
    this.messageSrv = injector.get(MessageService);
  }

}
