import {Component, model} from '@angular/core';
import {ProductService} from "../service/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService, SelectItemGroup} from "primeng/api";
import {IBrandListResponse} from "../../brand/interface/IBrandListResponse";
import {ModelService} from "../../model/service/model.service";
import {IModelListResponse} from "../../model/interface/IModelListResponse";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  update: boolean = false;
  modelOptions: SelectItemGroup[] = [];
  form!: FormGroup;

  constructor(
    private productService: ProductService,
    private modelService: ModelService,
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
    const {success, data} = await this.productService.GetById(id);
    if (success) {
      this.form.patchValue(data);
      this.form.controls['modelId'].setValue(data.model.id);
      this.update = true;
    }
  }

  async buildForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      costPrice: [undefined, Validators.required],
      salePrice: [undefined, Validators.required],
      imei: [''],
      quantity: [undefined, Validators.required],
      modelId: [undefined, Validators.required],
    });

    const {success, data} = await this.modelService.GetAll();
    if (success) {
      const group: SelectItemGroup[] = [];
      data.forEach((model: IModelListResponse) => {
        const findedGroup = group.find(g => g.value === model.brand.id);
        if (findedGroup) {
          findedGroup.items.push({label: model.name, value: model.id});
          return;
        }
        group.push({
          label: model.brand.name,
          value: model.brand.id,
          items: [{label: model.name, value: model.id}]
        });
      })
      this.modelOptions = group;
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
      await this.productService.Update(+this.form.controls['id']?.value, this.form.value) :
      await this.productService.Create(this.form.value);

    if (success)
      this.router.navigate(['/panel/product']).then(() =>
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Produto salvo com sucesso!'})
      );
  }

}
