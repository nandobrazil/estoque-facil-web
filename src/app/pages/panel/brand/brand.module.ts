import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrandRoutingModule } from './brand-routing.module';
import { BrandComponent } from './brand/brand.component';
import { BrandsComponent } from './brands/brands.component';


@NgModule({
  declarations: [
    BrandComponent,
    BrandsComponent
  ],
  imports: [
    CommonModule,
    BrandRoutingModule
  ]
})
export class BrandModule { }
