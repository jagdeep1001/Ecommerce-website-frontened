import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../products.service";
import {Router} from "@angular/router";
import {ProductClass} from "../ProductClass";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  // tslint:disable-next-line:new-parens
  private product: ProductClass = new class implements ProductClass {
    id: number;
    category: string;
    details: string;
    image: string;
    name: string;
    price: number;
  }
  constructor(private productsService: ProductsService, private router: Router) { }
  ngOnInit() {
  }

  addProduct() {
    console.log(this.product);
    if (this.product.name != null && this.product.category != null && this.product.details != null && this.product.image != null &&
      this.product.price != null) {
      if (this.product != null) {
        this.productsService.addProduct(this.product).subscribe(data => {
          alert('New Product Added Successfully');
          this.router.navigate(['products/all']);
        });
      }
    } else {
      alert('Please fill all the details.');
    }
  }

}
