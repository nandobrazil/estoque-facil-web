import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {UsersComponent} from "./users/users.component";
import {UserComponent} from "./user/user.component";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";
import {RippleModule} from "primeng/ripple";
import {PasswordModule} from "primeng/password";


@NgModule({
  declarations: [
    UserComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    RippleModule,
    PasswordModule
  ]
})
export class UserModule { }
