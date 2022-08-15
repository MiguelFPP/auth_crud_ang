import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-edit-products',
  templateUrl: './add-edit-products.component.html',
  styleUrls: ['./add-edit-products.component.css'],
})
export class AddEditProductsComponent implements OnInit {
  form: FormGroup;
  file: any;

  constructor(
    private _productService: ProductsService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: null,
    });
  }

  ngOnInit(): void {}

  onSubmit(): any {
    const formData: any = new FormData();
    formData.append('image', this.form.controls['image'].value);
    formData.append('name', this.form.controls['name'].value);
    formData.append('qty', this.form.controls['quantity'].value);
    formData.append('price', this.form.controls['price'].value);
    formData.append('description', this.form.controls['description'].value);

    this._productService.addProduct(formData).subscribe((data)=>{
      this.router.navigate(['secure']);
    },error=>{
      console.log(error);
    })
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

  get angForm(): any {
    return this.form.controls;
  }
}
