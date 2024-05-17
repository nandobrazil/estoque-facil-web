import {Component, OnInit} from '@angular/core';
import {IUserListResponse} from "../interface/IUserListResponse";
import {UserService} from "../service/user.service";
import {Table} from "primeng/table";
import {Router} from "@angular/router";
import {RoleDescriptionEnum} from "../../../../shared/enums/role.enum";
import {ConfirmationService, MessageService} from "primeng/api";
import {IQueryOptions} from "../../../../shared/interfaces/core/IQueryOptions";
import {IPagination} from "../../../../shared/interfaces/core/IPagination";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

  users!: IUserListResponse[];
  roleEnum: any = RoleDescriptionEnum;
  pagination: IPagination = {
    size: 10,
    pageNumber: 1,
    totalPages: 0,
    totalRecords: 0
  };
  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  async GetUsers(event: any) {
    const options: IQueryOptions = {};
    if (event) {
      options.size = event.rows;
      options.page =  event.first > 0 ? (event.first / event.rows) + 1 : 1;
    }
    const { success, data, pagination } = await this.userService.GetAllPaginated(options);
    if (success) {
      this.users = data!;
      this.pagination = pagination;
    }
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains')
  }

  navigateToCreateUser() {
    this.router.navigate(['panel/user/new']).then();
  }

  navigateToEditUser(id: number) {
    this.router.navigate([`panel/user/${id}`]).then();
  }

  async delete(id: number) {
    const success = await this.userService.Delete(id)
    if (success) await this.GetUsers(null);
  }
}
