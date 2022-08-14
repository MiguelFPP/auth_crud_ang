import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { SecureComponent } from './secure.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { AddEditProductsComponent } from './add-edit-products/add-edit-products.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoadComponent } from '../shared/load/load.component';

@NgModule({
  declarations: [
    SecureComponent,
    ListProductsComponent,
    AddEditProductsComponent,
    NavbarComponent,
    LoadComponent
  ],
  imports: [CommonModule, BrowserModule, AppRoutingModule, ReactiveFormsModule],
})
export class SecureModule {}
