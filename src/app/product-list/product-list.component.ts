// import {Component, Injectable, OnInit} from '@angular/core';
// import {ActivatedRoute, Router} from '@angular/router';
//
// import {AppService} from '../service/app.service';
// import {HttpClientService} from "../HttpClient.Service";
// import {Observable} from "rxjs";
//
//
// @Component({
//    selector: 'app-product-list',
//    templateUrl: './product-list.component.html',
//    styleUrls: ['./product-list.component.css']
// })
// export class ProductListComponent implements OnInit {
//   products;
//
//   constructor(
//     private router: Router,
//      private httpclientService: HttpClientService,
//     private service: AppService
//   ) {
//   }
//
//   c1;
//   hover: boolean;
//   ngOnInit() {
//
//   }
//   // mycart() {
//   //   if (this.service.checklogin()) {
//   //     this.router.navigate(['cart']);
//   //   }
//   // }
//   // gotodetails(id1) {
//   //   this.router.navigate(['productdetails'], {queryParams: {id: id1}});
//   // }
//   //
//   // showElectrical() {
//   //   this.c1 = 'electronics';
//   //   this.httpclientService.getElectrical('electronics').subscribe((data) => {
//   //     this.products= data;
//   //   });
//   // }
//   //
//   // showsports() {
//   //   this.c1 = 'sports';
//   //   this.httpclientService.getElectrical('sports').subscribe((data) => {
//   //     this.products = data;
//   //   });
//   // }
//   //
//   // showclothing() {
//   //   this.c1 = 'clothes';
//   //   this.httpclientService.getElectrical('clothes').subscribe((data) => {
//   //     this.products = data;
//   //   });
//   // }
//   //
//   // showbooks() {
//   //   this.c1 = 'books';
//   //   this.httpclientService.getElectrical('books').subscribe((data) => {
//   //     this.products = data;
//   //   });
//   // }
//   // handleSelected($event, number1: number, number2: number) {
//   //   if (!this.c1) {
//   //     this.httpclientService.getPriceBtw(number1, number2).subscribe((data) => {
//   //       this.products = data;
//   //     });
//   //   } else {
//   //     this.httpclientService.getPriceAndCategoryBtw(this.c1, number1, number2).subscribe((data) => {
//   //       this.products = data;
//   //     });
//   //   }
//   // }
// }
//
//
import { Component, OnInit } from '@angular/core';
import { MAIN_ROUTES } from '../app.route';
import {ProductsService} from '../products.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {CartService} from '../cart.service';
import {AuthenticationService} from '../authentication.service';
import {HttpHeaders} from '@angular/common/http';
import {RegistrationService} from '../registration.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductsService, private router: Router,
              private route: ActivatedRoute, private cartService: CartService,
              private loginService: AuthenticationService, private registrationService: RegistrationService) { }

  private products;
  private category;
  private role;
  private user;
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const cat = params.get('category');
      this.category = cat;
      if (this.category === 'all') {
        this.productService.getAllProducts().subscribe(data => this.products = data);
      } else {
        this.productService.getProductsOfCategory(this.category).subscribe(data => this.products = data);
      }
    });
    this.registrationService.getUser().subscribe( data => {
      this.user = data;
      this.role = this.user.role;
    });
  }
  seeDetails(product) {
    this.router.navigate(['product-detail', product.productId]);
  }
  goTo(category) {
    this.router.navigate(['products', category]);
  }
  filterByPrice(price1, price2) {
    if (this.category === 'all') {
      this.productService.getAllProductsOfPrice(price1, price2).subscribe(data => this.products = data);
    } else {
      this.productService.getProductsOfCategoryAndPrice(this.category, price1, price2).subscribe(data => this.products = data);
    }
  }

  addToCart(id) {
    this.cartService.addToCart(id).subscribe((data) =>
      console.log(data));
    alert('Product added to cart.');
  }

  removeProduct(product) {
    this.productService.removeFromDB(product.productId).subscribe((data) => {
      this.products = data;
      alert('Product Deleted Successfully');

    });
    this.cartService.removeOne(product.productId).subscribe(data=>{
      this.products=data;
    })
  }

  editProduct(product) {
    this.router.navigate(['editProduct', product.productId]);
  }
}
