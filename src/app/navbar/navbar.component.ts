import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {LoadingService} from "../services/loading.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  actions :Array <any>=[
    {title:"Home","route":"/home",icon:"house"},
    {title:"Product","route":"/admin/products",icon:"house"},
    {title:"NewProduct","route":"/admin/newproducts",icon:"house"}
  ];
  currentAction:any;
 // public isLoading :boolean=false;
  constructor( public appState:AppStateService,public loadingservice :LoadingService ,private router:Router ) {
    // this.loadingservice.isLoading$.subscribe(
    //   {
    //     next:(value)=>{
    //       this.isLoading=value;
    //     }
    //   }
    // )
    // avec   <!--    <li *ngIf="isLoading==true ">-->
  }

  setCurrentAction(action: any) {
    this.currentAction=action

  }

    protected readonly LoadingService = LoadingService;

  logout() {
    this.appState.authState = {};
    this.router.navigateByUrl("/login");
  }

  login() {
    this.router.navigateByUrl("/login");
  }
}
