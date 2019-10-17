import { Component, OnInit } from '@angular/core';
import {CartService} from "../cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {
  constructor(private cartService: CartService, private router: Router) { }

  private total = 0;
  private length = 0;
  private myProducts;
  ngOnInit() {
    this.cartService.showMyCart().subscribe((data) => {
      this.myProducts = data;
      this.length = this.myProducts.length;
      let sum = 0;
      for ( let i = 0; i < this.length; i++) {
        sum = sum + Number(this.myProducts[i].products.price) * Number(this.myProducts[i].quantity);
      }
      this.total = sum;
    });
  }

  removeOneQuantity(id) {
    this.cartService.removeOne(id).subscribe(data1 => {
      this.cartService.showMyCart().subscribe(data => {
        this.myProducts = data;
        this.length = this.myProducts.length;
        let sum = 0;
        for ( let i = 0; i < this.length; i++) {
          sum = sum + Number(this.myProducts[i].products.price) * Number(this.myProducts[i].quantity);
        }
        this.total = sum;
      });
    });

  }
  addOneQuantity(id) {
    this.cartService.addToCart(id).subscribe(data1 => {
      this.cartService.showMyCart().subscribe(data => {
        this.myProducts = data;
        this.length = this.myProducts.length;
        let sum = 0;
        for ( let i = 0; i < this.length; i++) {
          sum = sum + Number(this.myProducts[i].products.price) * Number(this.myProducts[i].quantity);
        }
        this.total = sum;
      });
    });
  }

  removeProduct(id) {
    this.cartService.removeWholeProduct(id).subscribe(data1 => {
      this.cartService.showMyCart().subscribe(data => {
        this.myProducts = data;
        this.length = this.myProducts.length;
        let sum = 0;
        for ( let i = 0; i < this.length; i++) {
          sum = sum + Number(this.myProducts[i].products.price) * Number(this.myProducts[i].quantity);
        }
        this.total = sum;
      });
    });
  }

  checkOut() {
    this.router.navigate(['home']);
  }

}
