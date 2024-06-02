import {Inject, Injectable, Injector} from "@angular/core";
import {BaseService} from "../../../../shared/services/base.service";
import {IProductListResponse} from "../interface/IProductListResponse";
import {IProductRequest} from "../interface/IProductRequest";

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<IProductListResponse, IProductListResponse, IProductRequest> {

  constructor(
    @Inject(Injector) injector: Injector
  ) {
    super('products', injector);
  }

}
