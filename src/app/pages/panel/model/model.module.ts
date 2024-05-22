import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelRoutingModule } from './model-routing.module';
import { ModelComponent } from './model/model.component';
import { ModelsComponent } from './models/models.component';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {DropdownModule} from "primeng/dropdown";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";


@NgModule({
  declarations: [
    ModelComponent,
    ModelsComponent,
  ],
  imports: [
    CommonModule,
    ModelRoutingModule,
    ButtonModule,
    InputTextModule,
    SharedModule,
    TableModule,
    DropdownModule,
    InputTextareaModule,
    ReactiveFormsModule,
    RippleModule
  ]
})
export class ModelModule { }
