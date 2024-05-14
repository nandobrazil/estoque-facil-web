import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {
    this.buildForm();
    if (this.authService.isLogged()) {
      this.router.navigate(['/panel/dashboard']).then();
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    })
  }


  async logIn() {
    if (!this.form.valid) {
      this.messageService.clear();
      this.messageService.add({
        severity: 'warn',
        summary: 'Login',
        detail: 'Informe o usuário e senha para efetuar o login!'
      });
      return;
    }
    const success = await this.authService.signIn(this.form.value);
    if (success) {
      await this.router.navigate(['/panel/dashboard']);
    } else {
      this.messageService.clear();
      this.messageService.add({
        severity: 'error',
        summary: 'Login',
        detail: 'Usuário ou senha inválidos!'
      });
    }
  }

}
