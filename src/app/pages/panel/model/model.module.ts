import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelRoutingModule } from './model-routing.module';
import { ModelComponent } from './model/model.component';
import { ModelsComponent } from './models/models.component';


@NgModule({
  declarations: [
    ModelComponent,
    ModelsComponent,
  ],
  imports: [
    CommonModule,
    ModelRoutingModule
  ]
})
export class ModelModule { }
