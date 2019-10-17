import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ProductClass} from './ProductClass';
import {Observable} from 'rxjs';
import {Users} from './Users';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }
  private url = 'http://localhost:2019';

  getAllProducts(): Observable<ProductClass[]> {
    return this.http.get<ProductClass[]>(this.url + '/products');
  }

  // tslint:disable-next-line:ban-types
  getOneProduct(id: Number): Observable<ProductClass> {
    return this.http.get<ProductClass>(this.url + '/product-detail/' + id);
  }

  getProductsOfCategory(category: string): Observable<ProductClass[]> {
    return this.http.get<ProductClass[]>(this.url + '/productsFrom/' + category);
  }

  getProductsOfCategoryAndPrice(category: string, price1: number, price2: number): Observable<ProductClass[]> {
    return this.http.get<ProductClass[]>(this.url + '/products/' + category + '/' + price1 + '/' + price2);
  }

  getAllProductsOfPrice(price1: number, price2: number): Observable<ProductClass[]> {
    return this.http.get<ProductClass[]>(this.url + '/products/' + price1 + '/' + price2);
  }

  addProduct(product) {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.post(this.url + '/addProduct', product, {headers});
  }

  removeFromDB(id) {
    const headers = new HttpHeaders( {Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.get(this.url + '/products/' + id + '/delete', {headers});
  }

  editProductDetails(product) {
    const headers = new HttpHeaders({Authorization: sessionStorage.getItem('basicAuth')});
    return this.http.post<ProductClass>(this.url + '/editProduct' , product, {headers});
  }

  getSearchedResult(searchedItem) {
    return this.http.get(this.url + '/search/' + searchedItem);
  }
}

