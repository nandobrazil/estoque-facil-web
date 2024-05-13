import {Inject, Injectable, Injector} from "@angular/core";
import {BaseService} from "../../../../shared/services/base.service";
import {lastValueFrom} from "rxjs";
import {IHttpResult} from "../../../../shared/interfaces/core/IHttpResult";
import {IUserListResponse} from "../interface/IUserListResponse";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(
    @Inject(Injector) injector: Injector
  ) {
    super('users', injector);
  }


  getAll(): Promise<IHttpResult<IUserListResponse[]>> {
    return lastValueFrom(this.http.get<IHttpResult<IUserListResponse[]>>(`${this.urlBase}`));
  }
}
