import { Injectable, Inject, Injector } from '@angular/core';
import {BaseService} from "./base.service";
import {lastValueFrom} from "rxjs";
import {IHttpResult} from "../interfaces/core/IHttpResult";
import {ICategoryResponse} from "../interfaces/ICategoryResponse";

@Injectable({ providedIn: 'root' })
export class CategoryService extends BaseService {

  constructor(
    @Inject(Injector) injector: Injector
  ) {
    super('category', injector);
  }

  async GetAll(): Promise<IHttpResult<ICategoryResponse[]>> {
    return lastValueFrom(this.http.get<IHttpResult<ICategoryResponse[]>>(`${this.urlBase}`));
  }
}
