import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PublicModule } from './public/public.module';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicComponent } from './public/public.component';
import { SecureComponent } from './secure/secure.component';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { NavbarComponent } from './public/navbar/navbar.component';
import { ListProductsComponent } from './secure/list-products/list-products.component';

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    SecureComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ListProductsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, PublicModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
