import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ProductsService} from '../products.service';
import {CartService} from '../cart.service';
import {AuthenticationService} from '../authentication.service';
import {ProductClass} from '../ProductClass';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  private productId;
  private product;
  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductsService,
              private loginService: AuthenticationService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      // tslint:disable-next-line:radix
      const id = parseInt(params.get('id'));
      this.productId = id;
    });

    this.productService.getOneProduct(this.productId).subscribe(data => this.product = data);
  }

  editProduct() {
    console.log(this.product);
    this.productService.editProductDetails(this.product).subscribe(data => {
      this.product = data;
      alert('Product Details updated successfully.');
      this.router.navigate(['products/all']);
    });
  }
}
