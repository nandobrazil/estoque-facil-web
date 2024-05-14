import {Component, OnInit} from '@angular/core';
import {IUserListResponse} from "../interface/IUserListResponse";
import {UserService} from "../service/user.service";
import {Table} from "primeng/table";
import {Router} from "@angular/router";
import {RoleDescriptionEnum} from "../../../../shared/enums/role.enum";
import {ConfirmationService, MessageService} from "primeng/api";

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
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
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

  navigateToCreateUser() {
    this.router.navigate(['panel/user/new']).then();
  }

  navigateToEditUser(id: number) {
    this.router.navigate([`panel/user/${id}`]).then();
  }

  async deleteUser(id: number) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este usuário?',
      accept: async () => {
        const { success } = await this.userService.Delete(id);
        if (success) {
          this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Usuário excluído com sucesso!'});
          this.users = this.users.filter(user => user.id !== id);
        }
      }
    });
  }
}
