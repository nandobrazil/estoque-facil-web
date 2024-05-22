import {BaseService} from "../../../../shared/services/base.service";
import {Inject, Injectable, Injector} from "@angular/core";
import {IBrandListResponse} from "../interface/IBrandListResponse";

@Injectable({
  providedIn: 'root'
})
export class BrandService extends BaseService<IBrandListResponse, any, any> {

  constructor(
    @Inject(Injector) injector: Injector
  ) {
    super('brands', injector);
  }
}
