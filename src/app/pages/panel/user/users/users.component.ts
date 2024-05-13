import {Component, OnInit} from '@angular/core';
import {IUserListResponse} from "../interface/IUserListResponse";
import {UserService} from "../service/user.service";
import {Table} from "primeng/table";
import {Router} from "@angular/router";
import {RoleDescriptionEnum} from "../../../../shared/enums/role.enum";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

  users!: IUserListResponse[];
  roleEnum: any = RoleDescriptionEnum;
  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  async ngOnInit() {
    const { success, data } = await this.userService.getAll();
    if (success) {
      this.users = data!;
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
  }

  navigateToCreateUser(){
    this.router.navigate(['panel/user/new'])
  }

  protected readonly RoleDescriptionEnum = RoleDescriptionEnum;
}
