import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  products: [] = [];
  load:boolean = false;

  constructor(private _productService: ProductsService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.load = true;
    this._productService.getProducts().subscribe(
      ({ data }) => {
        this.products = data;
        this.load = false;
        console.log(this.products);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteProduct(id: number) {
    this.load = true;
    this._productService.deleteProduct(id).subscribe(
      (data) => {
        this.load = false;
        this.getProducts();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
