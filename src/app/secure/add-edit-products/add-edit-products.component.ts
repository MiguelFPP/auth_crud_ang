import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.css'],
})
export class AddEditProductsComponent implements OnInit {
  form: FormGroup;
  file: any;
  title: string = 'Add';
  idProduct: number | undefined;
  imageFile: string;

  constructor(
    private _productService: ProductsService,
    private router: Router,
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: null,
    });
    this.idProduct = this.aRoute.snapshot.params['id'];
    this.imageFile = '';
  }

  ngOnInit(): void {
    if (this.idProduct !== undefined) {
      this.getProduct();
    }
  }

  onSubmit(): any {
    const formData: any = new FormData();

    /* check if camp image in form is null */
    if (this.form.get('image')?.value !== null) {
      formData.append('image', this.form.controls['image'].value);
    }
    formData.append('name', this.form.controls['name'].value);
    formData.append('qty', this.form.controls['quantity'].value);
    formData.append('price', this.form.controls['price'].value);
    formData.append('description', this.form.controls['description'].value);

    if (this.idProduct !== undefined) {
      this.updateProduct(formData);
    } else {
      this.saveProduct(formData);
    }
  }

  /**
   * We're getting the file from the event, and then we're patching the form with the file
   * @param {Event} event - Event - The event that triggered the function.
   */
  uploadImage(event: Event): void {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.form.patchValue({
      image: file,
    });
  }

  getProduct(): void {
    this._productService.getProduct(this.idProduct!).subscribe(
      ({ data }) => {
        this.form.patchValue({
          name: data.name,
          quantity: data.qty,
          price: data.price,
          description: data.description,
        });
        this.imageFile = environment.imageUrl + data.image;
      },
      (error) => {
        if (error.status === 404) {
          this.toastr.error('Product not found', 'Error');
          this.router.navigate(['secure']);
        }
        console.log(error);
      }
    );
  }

  saveProduct(formData: FormData): void {
    this._productService.addProduct(formData).subscribe(
      (data) => {
        this.toastr.success('Product added successfully', 'Success');
        this.router.navigate(['secure']);
      },
      (error) => {
        console.log(error);
        this.toastr.error('Error adding product', 'Error');
      }
    );
  }

  updateProduct(formData: FormData): void {
    this._productService.updateProduct(this.idProduct!, formData).subscribe(
      (data) => {
        this.toastr.success('Product updated successfully', 'Success');
        this.router.navigate(['secure']);
      },
      (error) => {
        this.toastr.error('Error updating product', 'Error');
        console.log(error);
      }
    );
  }

  get angForm(): any {
    return this.form.controls;
  }
}
