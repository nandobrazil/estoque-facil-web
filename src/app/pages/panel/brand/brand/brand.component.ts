import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../category/service/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService, SelectItem} from "primeng/api";
import {BrandService} from "../service/brand.service";

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent {

  categoryOptions: SelectItem[] = [];
  update: boolean = false;
  form!: FormGroup;

  constructor(
    private brandService: BrandService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {
    this.buildForm().then();
    this.activatedRoute.params.subscribe(async params => {
      if (params['id'])
        await this.Get(params['id']);
    });
  }

  async Get(id: number) {
    const {success, data} = await this.brandService.GetById(id);
    if (success) {
      this.form.patchValue(data);
      this.form.controls['categoryId'].setValue(data.category.id);
      this.update = true;
    }
  }

  async buildForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required]
    });

    const { success, data } = await this.categoryService.GetAll();
    if (success) {
      this.categoryOptions = data.map(category => ({ label: category.name, value: category.id }));
    }
  }

  async Save() {
    this.form.markAllAsTouched();
    this.form.invalid && this.messageService.add({severity:'warn', summary:'Atenção', detail:'Preencha todos os campos!'});
    if (this.form.invalid) return
    const { success, data } = this.update ?
      await this.brandService.Update(+this.form.controls['id']?.value, this.form.value) :
      await this.brandService.Create(this.form.value);

    if (success) {
      this.messageService.add({severity:'success', summary:'Success', detail: 'Marca salva com sucesso!'});
      await this.router.navigate(['/panel/brand']);
    }
  }
}
