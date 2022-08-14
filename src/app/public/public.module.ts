import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PublicComponent } from './public.component';

@NgModule({
  declarations: [
    PublicComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
  ],
  imports: [CommonModule, BrowserModule, AppRoutingModule, ReactiveFormsModule],
})
export class PublicModule {}
