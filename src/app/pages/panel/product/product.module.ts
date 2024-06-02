import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import {DataViewModule} from "primeng/dataview";
import {SkeletonModule} from "primeng/skeleton";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {TableModule} from "primeng/table";


@NgModule({
  declarations: [
    ProductComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    DataViewModule,
    SkeletonModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    PaginatorModule,
    ReactiveFormsModule,
    RippleModule,
    TableModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductModule { }
