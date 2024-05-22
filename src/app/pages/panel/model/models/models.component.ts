import { Component } from '@angular/core';
import {ICategoryListResponse} from "../../category/interface/ICategoryListResponse";
import {IPagination} from "../../../../shared/interfaces/core/IPagination";
import {CategoryService} from "../../category/service/category.service";
import {IQueryOptions} from "../../../../shared/interfaces/core/IQueryOptions";
import {ModelService} from "../service/model.service";
import {IModelListResponse} from "../interface/IModelListResponse";

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrl: './models.component.scss'
})
export class ModelsComponent {
  models: IModelListResponse[] = [];
  pagination: IPagination = {
    size: 10,
    pageNumber: 1,
    totalPages: 0,
    totalRecords: 0
  };
  constructor(
    private modelService: ModelService
  ) {}

  async Get(event: any) {
    const options: IQueryOptions = {};
    if (event) {
      options.size = event.rows;
      options.page =  event.first > 0 ? (event.first / event.rows) + 1 : 1;
    }
    const { success, data, pagination } = await this.modelService.GetAllPaginated(options);
    if (success) {
      this.models = data;
      this.pagination = pagination;
    }
  }

  async delete(id: number) {
    const success = await this.modelService.Delete(id);
    if (success) await this.Get(null);
  }
}
