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
import {from, Observable, of, switchMap} from 'rxjs';
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
    const accessToken = this.authService.getAccessToken();
    const headers = new HttpHeaders(accessToken ? {Authorization: `Bearer ${accessToken}`} : {});
    if (req.headers.get('Skip-Interceptor') === 'true') {
      headers.delete('Skip-Interceptor');
      this.loadingService.next(false);
    }
    req = req.clone({headers});
    this.loadingService.next(true);
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
          const message = error?.error?.data[0]?.message || 'Ocorreu um erro inesperado, tente novamente mais tarde';
          if (error?.error.data instanceof Array) {
            this.messageService.add({
              summary: 'Erro',
              severity: 'warn',
              detail: error.error.data.map((err: any) => err.message).join('. ')
            });
          } else {
            this.messageService.add({
              summary: 'Ocorreu um erro',
              severity: 'warn',
              detail: message
            });
          }
        } else if (error.status === 403) {
          this.messageService.add({
            summary: 'Não autorizado',
            severity: 'warn',
            detail: 'Você não tem permissão para acessar este recurso'
          });
        } else if (error.status === 401) {
          return this.handleUnauthorized(req, next);
        } else if (error.status === 500 && error.message.startsWith('JWT expired ')) {
          this.messageService.add({
            summary: 'Erro',
            severity: 'warn',
            detail: 'Sua sessão expirou, faça login novamente'
          });
          this.route.navigate(['/auth']).then(() => window.location.reload());
        } else {
          this.messageService.add({
            summary: 'Erro',
            severity: 'warn',
            detail: error.error.message ?? 'Não foi possível encontrar o recurso solicitado'
          });
        }
        return of(new HttpResponse({
          body: {
            success: false,
            data: error?.error,
            message: error?.error?.error || error?.message,
          }
        }));
      }),
      finalize(() => this.loadingService.next(false)),
    );
  }

  handleUnauthorized(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // get a new token via userService.refreshToken
      return from(this.authService.refresh())
        .pipe(switchMap((newToken: boolean) => {
            // did we get a new token retry previous request
            if (newToken) {
              const accessToken = this.authService.getAccessToken();
              const headers = new HttpHeaders(accessToken ? { Authorization: `Bearer ${accessToken}` } : { }) ;
              req = req.clone({ headers });
              return next.handle(req);
            }

            // If we don't get a new token, we are in trouble so logout.
            this.route.navigate(['/auth']);
            this.messageService.add({
              summary: 'Erro',
              severity: 'warn',
              detail: 'Ocorreu um erro inesperado, tente novamente mais tarde'
            });
            return of(new HttpResponse({
              body: {
                success: false,
                data: null,
                message: 'Ocorreu um erro inesperado, tente novamente mais tarde',
              }
            }));
          }),
          catchError(error => {
            this.messageService.add({
              summary: 'Erro',
              severity: 'warn',
              detail: 'Ocorreu um erro inesperado, tente novamente mais tarde'
            });
            return of(new HttpResponse({
              body: {
                success: false,
                data: error?.error,
                message: error?.error?.error || error?.message,
              }
            }));
          }),
          finalize(() => {
            this.isRefreshingToken = false;
          })
        );
    } else {
      return next.handle(req);
    }
  }
}
