import { Injectable, Inject, Injector } from '@angular/core';
import {BaseService} from "./base.service";
import {lastValueFrom} from "rxjs";
import {IHttpResult} from "../interfaces/core/IHttpResult";
import {IParamParentResponse, IParamResponse} from "../interfaces/IParamResponse";

@Injectable({ providedIn: 'root' })
export class OlxApiService extends BaseService {

  constructor(
    @Inject(Injector) injector: Injector
  ) {
    super('olx-api', injector);
  }

  async SyncBalance(): Promise<IHttpResult<IParamResponse[]>> {
    return lastValueFrom(this.http.post<IHttpResult<IParamResponse[]>>(`${this.urlBase}/balance/sync`, {}));
  }

}
