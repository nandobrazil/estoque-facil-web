import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand/brand.component';
import { BrandsComponent } from './brands/brands.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {DropdownModule} from "primeng/dropdown";


@NgModule({
  declarations: [
    BrandComponent,
    BrandsComponent
  ],
  imports: [
    CommonModule,
    BrandRoutingModule,
    ButtonModule,
    InputTextModule,
    SharedModule,
    TableModule,
    InputTextareaModule,
    ReactiveFormsModule,
    RippleModule,
    DropdownModule
  ]
})
export class BrandModule { }
