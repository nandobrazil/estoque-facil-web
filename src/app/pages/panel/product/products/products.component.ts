import {Component, OnInit} from '@angular/core';
import {ProductService} from "../service/product.service";
import {IProductListResponse} from "../interface/IProductListResponse";
import {IPagination} from "../../../../shared/interfaces/core/IPagination";
import {IQueryOptions} from "../../../../shared/interfaces/core/IQueryOptions";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  products: IProductListResponse[] = [];
  pagination: IPagination = {
    size: 10,
    pageNumber: 1,
    totalPages: 0,
    totalRecords: 0
  };
  constructor(
    private productService: ProductService
  ) {}

  async Get(event: any) {
    const options: IQueryOptions = {};
    if (event) {
      options.size = event.rows;
      options.page =  event.first > 0 ? (event.first / event.rows) + 1 : 1;
    }
    const { success, data, pagination } = await this.productService.GetAllPaginated(options);
    if (success) {
      this.products = data;
      this.pagination = pagination;
    }
  }

  async delete(id: number) {
    const success = await this.productService.Delete(id);
    if (success) await this.Get(null);
  }

}
