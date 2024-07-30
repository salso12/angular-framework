import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {subscribe} from "node:diagnostics_channel";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {createInjectableType} from "@angular/compiler";
import { Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  //products! :Array<Product>;

  // products$! :Observable<Array<Product>>;

   // public products :Array<Product>=[];
   // public  keyword: string="";
   // totalPages:number=0;
   // pageSize:number=3;
   // currentpage:number=1;
   //




  /*{id:1,name:'computer',price:4555455 ,checked:false},
  {id:2,name:'Printer',price:360256 ,checked:true},
  {id:3,name:'Phone',price:45660 ,checked:false}]*/


 // constructor(private http:HttpClient) {}

  constructor(private productservice:ProductService ,private router:Router,
  public appState:AppStateService ) {}
  ngOnInit() {
   /* this.http.get<any>("http://localhost:8086/products")
      .subscribe(
        {
          next:data=>{this.products=data}
        ,
        error:err =>
       {
         console.log(err);
       }
        }


      )*/
    this.searchProducts();
  }
 /*getProducts(){
   //this.http.get<any>("http://localhost:8086/products")
   //solution 1
   this.productservice.getProducts(1,2)
     .subscribe(
       {
         next:data=>{this.products=data}
         ,
         error:err =>
         {
           console.log(err);
         }
       }


     )*/
  searchProducts(){
    //this.appState.productsState.status="LOADING";
 /*   this.appState.setProductState(
      {
        status:"LOADING"
      }
    );
    we do 'intercept' instead*/
    //this.http.get<any>("http://localhost:8086/products")
    //solution 1
    this.productservice.searchProducts(this.appState.productsState.keyword,this.appState.productsState.currentpage,this.appState.productsState.pageSize)
      .subscribe(
        {
          next:(resp)=>{
            let products=resp.body as Product[];
             let totalProduct:number =parseInt(resp.headers.get("X-Total-Count")!);
//this.appState.productsState.totalProduct=totalProduct;
           let totalPages=Math.floor(totalProduct/this.appState.productsState.pageSize);
             //the rest
            if(totalProduct % this.appState.productsState.pageSize !=0)
            {
              this.appState.productsState.totalPages=this.appState.productsState.totalPages+1
            }
          console.log(this.appState.productsState.totalPages);

            this.appState.setProductState({
              products:products,
              totalProducts:totalProduct,
              totalPages:totalPages,
                status:"LOADED"

            })
           }
          ,
          error:err =>
          {
            this.appState.setProductState({

                status:"ERROR",
              errorMessage:err

            })
          }
        }


      )

   //solution2
   //this.products$=this.productservice.getProducts();
//we can generate errors with pip




 }





  handleCheckProduct(product: Product) {
    //put it allows you to change all attributes
    //It sends an object containing a checked property whose value is the inverse of the current value of product.checked
    //this.http.patch<any>(`http://localhost:8086/products/${product.id}`, {checked:!product.checked}).
    this.productservice.checkProduct(product)
      .subscribe(
        {
          next:updatedproduct=>{
            product.checked=!product.checked;
            //this.getProduction();

          }


        })

          }

  handleDeletProduct(product: Product) {
    if(confirm("Etes vous sure ?"))

    this.productservice.deleteProduct(product).subscribe(
      {
        next:value=>
        {
          //this.getProducts();
          //ignore it in front end
         // this.appState.productsState.products=this.appState.productsState.products.filter((p:any)=>p.id!=product.id)
          this.searchProducts();

        }
      }
    )
  }










  /*searchProduct() {

 this.productservice.searchProducts(this.currentpage,this.pageSize).subscribe(
   {next:data=>
     {this.products=data;}}
 )
  }*/












  handelGotPage(page: number) {
    this.appState.productsState.currentpage=page;
    this.searchProducts();

  }

/*  handleEditProduct(product: Product) {
    this.route.navigateByUrl(`/editProduct/${product.id}`)
  }*/

  handleEditProduct(product: Product) {
    this.router.navigateByUrl(`/admin/editproducts/${product.id}`)
  }
}
