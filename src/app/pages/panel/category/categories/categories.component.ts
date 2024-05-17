import { Component } from '@angular/core';
import {CategoryService} from "../service/category.service";
import {IQueryOptions} from "../../../../shared/interfaces/core/IQueryOptions";
import {ICategoryListResponse} from "../interface/ICategoryListResponse";
import {IPagination} from "../../../../shared/interfaces/core/IPagination";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  categories: ICategoryListResponse[] = [];
  pagination: IPagination = {
    size: 10,
    pageNumber: 1,
    totalPages: 0,
    totalRecords: 0
  };
  constructor(
    private categoryService: CategoryService
  ) {}

  async GetCategories(event: any) {
    const options: IQueryOptions = {};
    if (event) {
      options.size = event.rows;
      options.page =  event.first > 0 ? (event.first / event.rows) + 1 : 1;
    }
    const { success, data, pagination } = await this.categoryService.GetAllPaginated(options);
    if (success) {
      this.categories = data;
      this.pagination = pagination;
    }
  }

  async delete(id: number) {
    const success = await this.categoryService.Delete(id);
    if (success) await this.GetCategories(null);
  }
}
