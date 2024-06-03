import {CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, isDevMode} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {ConfirmationService, MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {HttpRequestInterceptorModule} from "./shared/interceptors/http-request.interceptor.module";
import {registerLocaleData} from "@angular/common";
import localePt from '@angular/common/locales/pt';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {PanelModule} from "./pages/panel/panel.module";
import {LoadingComponent} from "./layout/loading/loading.component";
import {ToastModule} from "primeng/toast";
import { ServiceWorkerModule } from '@angular/service-worker';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpRequestInterceptorModule,
    HttpClientModule,
    AppRoutingModule,
    ConfirmDialogModule,
    PanelModule,
    ToastModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    ConfirmationService,
    MessageService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
