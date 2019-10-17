import { Component, OnInit } from '@angular/core';
// import {HttpClientService} from "../HttpClient.Service";

import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductsService} from "../products.service";
import {CartService} from "../cart.service";
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
private productId;
private  product;
  constructor( private route:ActivatedRoute, private router :Router, private productsService:ProductsService,
               private cartService: CartService, private loginService: AuthenticationService

  ) { }

  ngOnInit() {
this.route.paramMap.subscribe((params:ParamMap)=>{
  const id =parseInt(params.get('id'));
  this.productId=id;
    });
this.productsService.getOneProduct(this.productId).subscribe(data=>this.product=data);
  }
addThisProductToCart(id){
    this.cartService.addToCart(id).subscribe(data=>console.log(data));
    alert('This Product has been added to cart');
}
}
