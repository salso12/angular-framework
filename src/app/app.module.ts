import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { NewProductComponent } from './new-product/new-product.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import {ProductService} from "./services/product.service";
import { EditProductComponent } from './edit-product/edit-product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AppErrorsComponent } from './app-errors/app-errors.component';
import {appHttpInterceptor} from "./services/app-http.interceptor";
import { LoginComponent } from './login/login.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    NewProductComponent,
    EditProductComponent,
    DashboardComponent,
    NavbarComponent,
    AppErrorsComponent,
    LoginComponent,
    AdminTemplateComponent,
    NotAuthorizedComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
      //for search
FormsModule,
      HttpClientModule,
      ReactiveFormsModule
    ],
  providers: [
    {provide :HTTP_INTERCEPTORS,useClass:appHttpInterceptor ,multi:true},
    provideClientHydration(),
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
