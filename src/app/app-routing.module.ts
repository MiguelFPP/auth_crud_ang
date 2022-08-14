import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './public/login/login.component';
import { PublicComponent } from './public/public.component';
import { RegisterComponent } from './public/register/register.component';
import { AddEditProductsComponent } from './secure/add-edit-products/add-edit-products.component';
import { ListProductsComponent } from './secure/list-products/list-products.component';
import { SecureComponent } from './secure/secure.component';

const routes: Routes = [
  {path:'', component:PublicComponent, children:[
    {path:'', component:LoginComponent},
    {path:'register', component:RegisterComponent}
  ]},
  {path:'secure', component:SecureComponent, canActivate:[AuthGuard], children:[
    {path:'', component:ListProductsComponent},
    {path:'secure/add', component:AddEditProductsComponent},
    {path:'secure/edit/:id', component:AddEditProductsComponent}
  ]},
  {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
