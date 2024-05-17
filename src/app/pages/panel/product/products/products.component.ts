import {Component, OnInit} from '@angular/core';
import {ProductService} from "../service/product.service";
import {IProductListResponse} from "../interface/IProductListResponse";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  layout: 'list' | 'grid' = 'list';

  products!: IProductListResponse[];

  constructor(private productService: ProductService) {}

  async ngOnInit() {
    const { success, data } = await this.productService.GetAll();
    if (success) {
      this.products = data!;
    }
  }

  counterArray(n: number): any[] {
    return Array(n);
  }

}
