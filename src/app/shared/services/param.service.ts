import { Injectable, Inject, Injector } from '@angular/core';
import {BaseService} from "./base.service";
import {lastValueFrom} from "rxjs";
import {IHttpResult} from "../interfaces/core/IHttpResult";
import {IParamParentResponse, IParamResponse} from "../interfaces/IParamResponse";

@Injectable({ providedIn: 'root' })
export class ParamService extends BaseService {

  constructor(
    @Inject(Injector) injector: Injector
  ) {
    super('param', injector);
  }

  async GetByCategory(categoryId: number): Promise<IHttpResult<IParamResponse[]>> {
    return lastValueFrom(this.http.get<IHttpResult<IParamResponse[]>>(`${this.urlBase}/${categoryId}`));
  }

  async GetByParentId(parentId: number): Promise<IHttpResult<IParamParentResponse[]>> {
    return lastValueFrom(this.http.get<IHttpResult<IParamParentResponse[]>>(`${this.urlBase}/parent/${parentId}`));
  }
}
