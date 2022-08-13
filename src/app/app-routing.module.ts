import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './public/login/login.component';
import { PublicComponent } from './public/public.component';
import { RegisterComponent } from './public/register/register.component';
import { SecureComponent } from './secure/secure.component';

const routes: Routes = [
  {path:'', component:PublicComponent, children:[
    {path:'', component:LoginComponent},
    {path:'register', component:RegisterComponent}
  ]},
  {path:'secure', component:SecureComponent, canActivate:[AuthGuard]},
  {path:'**', redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
