import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { NewProductComponent } from './new-product/new-product.component';
import {EditProductComponent} from "./edit-product/edit-product.component";
import {LoginComponent} from "./login/login.component";
import {AdminTemplateComponent} from "./admin-template/admin-template.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {AuthorizationGuardGuard} from "./guards/authorization.guard";
import {NotAuthorizedComponent} from "./not-authorized/not-authorized.component";

const routes: Routes = [
  {path :"login",component:LoginComponent},
  // http://localhost:4200/admin/newproducts
  // il est proteger par  AuthenticationGuard  qui returner true or r
  {path :"admin",component:AdminTemplateComponent,canActivate:[AuthenticationGuard],children :[
      {path:"products",component:ProductComponent},
      {path:"newproducts",component:NewProductComponent,canActivate:[AuthorizationGuardGuard], data: {requiredRoles: 'ADMIN'} },
      {
        path: "editproducts/:id", component: EditProductComponent, canActivate: [AuthorizationGuardGuard]
        , data: {requiredRoles: 'ADMIN'}
      },
      {path:"home",component:HomeComponent},
      {path:"notAuthorized",component:NotAuthorizedComponent},

    ]},


  {path :"",redirectTo:"login",pathMatch:"full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
