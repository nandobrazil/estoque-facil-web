import {Inject, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfirmationService, MessageService} from 'primeng/api';
import {environment} from "../../../environments/environment";
import {IHttpResult} from "../interfaces/core/IHttpResult";
import {lastValueFrom} from "rxjs";
import {IQueryOptions} from "../interfaces/core/IQueryOptions";
import {PrepareHttpParams} from "../utils/query.utils";
import {IResultPaginated} from "../interfaces/core/IResultPaginated";

export abstract class BaseService<IListResponse, IResponse, IRequest> {

  urlBase = '';
  http: HttpClient;
  confirmationSrv: ConfirmationService;
  messageSrv: MessageService;

  protected constructor(
    public url: string,
    @Inject(Injector) injector: Injector
  ) {
    this.urlBase = `${environment.apiUrl}/${this.url}`;
    this.http = injector.get(HttpClient);
    this.confirmationSrv = injector.get(ConfirmationService);
    this.messageSrv = injector.get(MessageService);
  }

  public async GetAll(): Promise<IHttpResult<IListResponse[]>> {
    return lastValueFrom(this.http.get<IHttpResult<IListResponse[]>>(this.urlBase));
  }

  public async GetAllPaginated(options?: IQueryOptions): Promise<IResultPaginated<IListResponse[]>> {
    const optionsPrepared: IQueryOptions = {
      size: 10,
      page: 1,
    };
    optionsPrepared.size = options?.size || optionsPrepared.size;
    optionsPrepared.page = options?.page || optionsPrepared.page;
    return lastValueFrom(this.http.get<IResultPaginated<IListResponse[]>>(`${this.urlBase}?${PrepareHttpParams(optionsPrepared)}`));
  }

  public async GetById(id: number): Promise<IHttpResult<IResponse>> {
    return lastValueFrom(this.http.get<IHttpResult<IResponse>>(`${this.urlBase}/${id}`));
  }

  public async Create(data: IRequest): Promise<IHttpResult<{ id: number }>> {
    return lastValueFrom(this.http.post<IHttpResult<{ id: number }>>(this.urlBase, data));
  }

  public async Update(id: number, data: IRequest): Promise<IHttpResult<void>> {
    return lastValueFrom(this.http.put<IHttpResult<void>>(`${this.urlBase}/${id}`, data));
  }

  public async ConfirmDelete(id: number): Promise<IHttpResult<void>> {
    return lastValueFrom(this.http.delete<IHttpResult<void>>(`${this.urlBase}/${id}`));
  }

  public async Delete(id: number, message?: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.confirmationSrv.confirm({
        message: message ?? 'Tem certeza que deseja excluir este registro?',
        acceptLabel: 'Confirmar',
        rejectLabel: 'Cancelar',
        accept: async () => {
            const { success } = await this.ConfirmDelete(id);
            this.messageSrv.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro excluído com sucesso!' });
            resolve(success);
        }
      });
    });
  }

}
