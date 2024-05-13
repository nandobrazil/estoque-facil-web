import { Component } from '@angular/core';
import {RoleOptionsEnum} from "../../../../shared/enums/role.enum";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  roleOptions = RoleOptionsEnum;
}
