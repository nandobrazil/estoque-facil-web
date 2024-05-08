import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import {StyleClassModule} from "primeng/styleclass";
import {RouterModule} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {LandingComponent} from "./landing.component";
import {RippleModule} from "primeng/ripple";


@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    ButtonModule,
    RouterModule,
    StyleClassModule,
    LandingRoutingModule,
    RippleModule
  ]
})
export class LandingModule { }
