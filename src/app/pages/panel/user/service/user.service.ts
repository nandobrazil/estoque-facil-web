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
export class UserService extends BaseService {

  constructor(
    @Inject(Injector) injector: Injector
  ) {
    super('users', injector);
  }

  async Post(request: IUserRequest): Promise<IHttpResult<void>> {
    return lastValueFrom(this.http.post<IHttpResult<void>>(this.urlBase, request));
  }

  async getAll(options?: IQueryOptions): Promise<IHttpResult<IUserListResponse[]>> {
    return lastValueFrom(this.http.get<IHttpResult<IUserListResponse[]>>(`${this.urlBase}${PrepareHttpParams(options)}`));
  }

  async Get(id: string): Promise<IHttpResult<IUserResponse>> {
    return lastValueFrom(this.http.get<IHttpResult<IUserResponse>>(`${this.urlBase}/${id}`));
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

  async Delete(id: number): Promise<IHttpResult<void>> {
    return lastValueFrom(this.http.delete<IHttpResult<void>>(`${this.urlBase}/${id}`));
  }
}
