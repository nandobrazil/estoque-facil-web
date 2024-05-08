import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelRoutingModule } from './panel-routing.module';
import { PanelComponent } from './panel.component';
import {NavComponent} from "../../layout/nav/nav.component";
import {ToastModule} from "primeng/toast";
import {BreadcrumbComponent} from "../../layout/breadcrumb/breadcrumb.component";
import {ButtonModule} from "primeng/button";
import {MaintenanceComponent} from "../../layout/maintenance/maintenance.component";


@NgModule({
  declarations: [
    PanelComponent,
    NavComponent,
    BreadcrumbComponent,
    MaintenanceComponent,
  ],
  exports: [
    MaintenanceComponent,
  ],
  imports: [
    CommonModule,
    ToastModule,
    PanelRoutingModule,
    ButtonModule,
  ]
})
export class PanelModule {}
