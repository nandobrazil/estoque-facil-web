import {Inject, Injectable, Injector} from "@angular/core";
import {BaseService} from "../../../../shared/services/base.service";
import {lastValueFrom} from "rxjs";
import {IHttpResult} from "../../../../shared/interfaces/core/IHttpResult";
import {IProductListResponse} from "../interface/IProductListResponse";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  constructor(
    @Inject(Injector) injector: Injector
  ) {
    super('products', injector);
  }


  getAll(): Promise<IHttpResult<IProductListResponse[]>> {
    return lastValueFrom(this.http.get<IHttpResult<IProductListResponse[]>>(`${this.urlBase}`));
  }
}
