import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
})
export class ListProductsComponent implements OnInit {
  products: Product[] = [];
  load: boolean = false;

  constructor(
    private _productService: ProductsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.load = true;
    this._productService.getProducts().subscribe(
      ({ data }) => {
        this.products = data;
        this.load = false;
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
        this.toastr.success('Product deleted successfully', 'Success');
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error deleting product', 'Error');
      }
    );
  }
}
