import {Inject, Injectable, Injector} from "@angular/core";
import {BaseService} from "../../../../shared/services/base.service";
import {lastValueFrom} from "rxjs";
import {IHttpResult} from "../../../../shared/interfaces/core/IHttpResult";
import {IUserListResponse} from "../interface/IUserListResponse";
import {IQueryOptions} from "../../../../shared/interfaces/core/IQueryOptions";
import {PrepareHttpParams} from "../../../../shared/utils/query.utils";
import {IUserResponse} from "../interface/IUserResponse";
import {IUserRequest} from "../interface/IUserRequest";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<IUserListResponse, IUserResponse, IUserRequest> {

  constructor(
    @Inject(Injector) injector: Injector
  ) {
    super('users', injector);
  }

  async ChangePassword(id: string, password: string): Promise<IHttpResult<void>> {
    return lastValueFrom(this.http.patch<IHttpResult<void>>(`${this.urlBase}/${id}/change-password`, {
      password
    }));
  }

  async ChangeRole(id: string, role: 'ADMIN' | 'SELLER'): Promise<IHttpResult<void>> {
    return lastValueFrom(this.http.patch<IHttpResult<void>>(`${this.urlBase}/${id}/role`, {
      role: role
    }));
  }

}
