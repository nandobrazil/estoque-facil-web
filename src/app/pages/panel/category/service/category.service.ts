import {BaseService} from "../../../../shared/services/base.service";
import {Inject, Injectable, Injector} from "@angular/core";
import {ICategoryListResponse} from "../interface/ICategoryListResponse";

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<ICategoryListResponse, any, any> {

  constructor(
    @Inject(Injector) injector: Injector
  ) {
    super('categories', injector);
  }
}
