import {Component, OnInit} from '@angular/core';
import {RoleOptionsEnum} from "../../../../shared/enums/role.enum";
import {UserService} from "../service/user.service";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {IUserListResponse} from "../interface/IUserListResponse";
import {IUserResponse} from "../interface/IUserResponse";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IUserRequest} from "../interface/IUserRequest";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  roleOptions = RoleOptionsEnum;
  form!: FormGroup;
  update: boolean = false;
  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  async ngOnInit() {
    this.buildForm();
    const { id } = this.activatedRoute.snapshot.params;
    if (id) {
      await this.GetUser(id);
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      confirmPassword: [''],
      role: ['SELLER', Validators.required],
    });
    this.form.controls['password']?.valueChanges.subscribe((value) => {
      const confirm = this.form.controls['confirmPassword']?.value;
      if (confirm) {
        const isEqual = value === confirm;
        this.form.controls['confirmPassword']?.setErrors(isEqual ? null : {invalid: true});
      }
    });
    this.form.controls['confirmPassword']?.valueChanges.subscribe((value) => {
      console.log(value)
      const isEqual = value === this.form.controls['password']?.value;
      this.form.controls['confirmPassword']?.setErrors(isEqual ? null : {invalid: true});
    });
  }

  async GetUser(id: string) {
    const { success, data } = await this.userService.Get(id);
    if (success) {
      this.update = true;

      this.form.patchValue(data!);
      this.form.controls['password']?.setValidators(Validators.required);
      this.form.controls['confirmPassword']?.setValidators(Validators.required);
      this.form.controls['name'].disable();
      this.form.controls['username'].disable();
      this.form.controls['email'].disable();
    }
  }

  async updatePassword() {
    const { id, password, confirmPassword } = this.form.value;
    this.form.markAllAsTouched();
    if (password !== confirmPassword) {
      this.messageService.add({severity:'warn', summary:'Atenção', detail:'A senha e a confirmação de senha não são iguais!'});
      return;
    }
    const { success } = await this.userService.ChangePassword(id, password);
    if (success) {
      this.messageService.add({severity:'success', summary:'Sucesso', detail:'Senha alterada com sucesso!'});
      this.form.controls['password'].reset();
      this.form.controls['confirmPassword'].reset();
    }
  }

  async updateRole() {
    const { id, role } = this.form.value;
    const { success } = await this.userService.ChangeRole(id, role);
    if (success) {
      this.messageService.add({severity:'success', summary:'Sucesso', detail:'Perfil alterado com sucesso!'});
    }
  }

  async Save() {
    this.form.markAllAsTouched();
    this.form.invalid && this.messageService.add({severity:'warn', summary:'Atenção', detail:'Preencha todos os campos!'});
    if (this.form.invalid) return
    const userRequest: IUserRequest = this.form.value;
    const { success } = await this.userService.Post(userRequest);
    if (success) {
      this.messageService.add({severity:'success', summary:'Sucesso', detail:'Usuário criado com sucesso!'});
      this.router.navigate(['panel/user']).then();
    }
  }

}
