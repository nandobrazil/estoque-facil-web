import {Component} from '@angular/core';
import {MessageService, SelectItemGroup} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BrandService} from "../../brand/service/brand.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ModelService} from "../service/model.service";
import {IBrandListResponse} from "../../brand/interface/IBrandListResponse";

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrl: './model.component.scss'
})
export class ModelComponent {

  brandOptions: SelectItemGroup[] = [];
  update: boolean = false;
  form!: FormGroup;

  constructor(
    private modelService: ModelService,
    private brandService: BrandService,
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
    const {success, data} = await this.modelService.GetById(id);
    if (success) {
      this.form.patchValue(data);
      this.form.controls['brandId'].setValue(data.brand.id);
      this.update = true;
    }
  }

  async buildForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      brandId: ['', Validators.required]
    });

    const {success, data} = await this.brandService.GetAll();
    if (success) {
      const group: SelectItemGroup[] = [];
      data.forEach((brand: IBrandListResponse) => {
        const findedGroup = group.find(g => g.value === brand.category.id);
        if (findedGroup) {
          findedGroup.items.push({label: brand.name, value: brand.id});
          return;
        }
        group.push({
          label: brand.category.name,
          value: brand.category.id,
          items: [{label: brand.name, value: brand.id}]
        });
      })
      this.brandOptions = group;
    }
  }

  async Save() {
    this.form.markAllAsTouched();
    this.form.invalid && this.messageService.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Preencha todos os campos!'
    });
    if (this.form.invalid) return
    const {success, data} = this.update ?
      await this.modelService.Update(+this.form.controls['id']?.value, this.form.value) :
      await this.modelService.Create(this.form.value);

    if (success) {
      this.messageService.add({severity: 'success', summary: 'Success', detail: 'Modelo salvo com sucesso!'});
      await this.router.navigate(['/panel/model']);
    }
  }
}
