import { Component } from '@angular/core';
import {IPagination} from "../../../../shared/interfaces/core/IPagination";
import {IQueryOptions} from "../../../../shared/interfaces/core/IQueryOptions";
import {IBrandListResponse} from "../interface/IBrandListResponse";
import {BrandService} from "../service/brand.service";

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent {
  brands: IBrandListResponse[] = [];
  pagination: IPagination = {
    size: 10,
    pageNumber: 1,
    totalPages: 0,
    totalRecords: 0
  };
  constructor(
    private brandService: BrandService
  ) {}

  async Get(event: any) {
    const options: IQueryOptions = {};
    if (event) {
      options.size = event.rows;
      options.page =  event.first > 0 ? (event.first / event.rows) + 1 : 1;
    }
    const { success, data, pagination } = await this.brandService.GetAllPaginated(options);
    if (success) {
      this.brands = data;
      this.pagination = pagination;
    }
  }

  async delete(id: number) {
    const success = await this.brandService.Delete(id);
    if (success) await this.Get(null);
  }
}

