import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css'
})
export class NewProductComponent implements OnInit{
       public productForm!:FormGroup;
       //inject
       constructor(private fb:FormBuilder,private productservice:ProductService)
           {}
 // Initializes reactive form with controls for product details.
  ngOnInit() {

         this.productForm=this.fb.group({
           name:this.fb.control('',[Validators.required]),
           price:this.fb.control(0),
           checked:this.fb.control(false)
         })
  }

  saveProduct() {
  //i will retrieve the form
    let product =this.productForm.value;
    this.productservice.saveProduct(product).subscribe(
      {
        next:date => {
          alert((JSON.stringify(date)))
        },
        error:err=>{
        console.log(err)
        }
      }

    );


  }
}

