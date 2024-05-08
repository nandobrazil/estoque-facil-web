import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {ChartModule} from "primeng/chart";
import {DropdownModule} from "primeng/dropdown";
import {KnobModule} from "primeng/knob";
import {ButtonModule} from "primeng/button";
import {PanelModule} from "../panel.module";


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    RatingModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ChartModule,
    DropdownModule,
    KnobModule,
    ButtonModule,
    PanelModule
  ]
})
export class DashboardModule { }
