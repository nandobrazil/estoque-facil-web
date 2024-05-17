import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../service/category.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  update: boolean = false;
  form!: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {
    this.buildForm();
    this.activatedRoute.params.subscribe(async params => {
      if (params['id'])
        await this.Get(params['id']);
    });
  }

  async Get(id: number) {
    const {success, data} = await this.categoryService.GetById(id);
    if (success) {
      this.form.patchValue(data);
      this.update = true;
    }
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  async Save() {
    this.form.markAllAsTouched();
    this.form.invalid && this.messageService.add({severity:'warn', summary:'Atenção', detail:'Preencha todos os campos!'});
    if (this.form.invalid) return
    const { success, data } = this.update ?
      await this.categoryService.Update(+this.form.controls['id']?.value, this.form.value) :
      await this.categoryService.Create(this.form.value);

    if (success) {
      this.messageService.add({severity:'success', summary:'Success', detail: 'Categoria salva com sucesso!'});
      await this.router.navigate(['/panel/category']);
    }
  }
}
