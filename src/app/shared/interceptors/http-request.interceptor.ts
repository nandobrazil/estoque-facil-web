import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {of} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';
import {MessageService} from 'primeng/api';

import {Router} from '@angular/router';
import {LoadingService} from "../services/loading.service";
import {AuthService} from "../services/auth.service";
import {environment} from "../../../environments/environment";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  isRefreshingToken = false;
  environment = environment;
  private requestCount = 0;

  constructor(
    private messageService: MessageService,
    private loadingService: LoadingService,
    private authService: AuthService,
    private route: Router
  ) {
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ) {
    this.requestCount++;
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders(accessToken ? {Authorization: `Bearer ${accessToken}`} : {});
    if (req.headers.get('Skip-Interceptor') === 'true') {
      headers.delete('Skip-Interceptor');
      this.requestCount--;
      return next.handle(req);
    }
    req = req.clone({headers});
    if (req.clone().method === 'POST' || req.clone().method === 'PUT') this.loadingService.next(true);
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && req.url.startsWith(this.environment.apiUrl)) {
          const body = event.body;
          return event.clone({
            body: {
              success: true,
              data: body?.data === undefined ? body : body?.data,
              pagination: body?.pagination,
              message: body?.message || body?.error || ''
            }
          });
        }
        return event;
      }),
      catchError((error: HttpErrorResponse, restart) =>   {
        this.messageService.clear();
        this.loadingService.next(false);
        if ([422, 404, 400].includes(error.status)) {
          const message = error?.error?.message || error?.error?.erro
            || error?.message;
          if (error?.error instanceof Array) {
            this.messageService.add({
              summary: 'Atenção',
              severity: 'warn',
              detail: message
            });
          } else {
            this.messageService.add({
              summary: 'Atenção',
              severity: 'warn',
              detail: message
            });
          }
        } else if ([401, 403].includes(error.status)) {
          this.messageService.add({
            summary: 'Erro',
            severity: 'warn',
            detail: 'Você não tem permissão para acessar este recurso'
          });
        } else if (error.status === 500 && error.message.startsWith('JWT expired ')) {
          this.messageService.add({
            summary: 'Erro',
            severity: 'warn',
            detail: 'Sua sessão expirou, faça login novamente'
          });
          this.route.navigate(['/auth']).then(() => window.location.reload());
        }
        return of(new HttpResponse({
          body: {
            success: false,
            data: error?.error,
            message: error?.error?.error || error?.message,
          }
        }));
      }),
      finalize(() => {
        this.requestCount--;
        if (this.requestCount <= 0) this.loadingService.next(false);
      }),
    );
  }
}
