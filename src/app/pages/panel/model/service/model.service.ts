import {BaseService} from "../../../../shared/services/base.service";
import {Inject, Injectable, Injector} from "@angular/core";
import {IModelListResponse} from "../interface/IModelListResponse";

@Injectable({
  providedIn: 'root'
})
export class ModelService extends BaseService<IModelListResponse, any, any> {

  constructor(
    @Inject(Injector) injector: Injector
  ) {
    super('models', injector);
  }
}
