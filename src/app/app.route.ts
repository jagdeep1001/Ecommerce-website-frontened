import {Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {UserCartComponent} from './user-cart/user-cart.component';
import {LoginDComponent} from  './login-d/login-d.component';
import {SigninComponent} from  './signin/signin.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {AuthguardService} from "./authguard.service";
import {OrderHistoryComponent} from "./order-history/order-history.component";
import {MyAccountComponent} from "./my-account/my-account.component";
import {AddProductComponent} from "./add-product/add-product.component";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {LogoutComponent} from "./logout/logout.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
export const MAIN_ROUTES: Routes= [
  { path : '', redirectTo: '/home', pathMatch: 'full'},
  { path : 'home', component: HomePageComponent },
  { path : 'registration', component: SigninComponent },
  { path : 'login', component: LoginDComponent },
  { path : 'orderHistory', component: OrderHistoryComponent, canActivate: [AuthguardService]},
  { path : 'myAccount', component: MyAccountComponent, canActivate: [AuthguardService]},
  { path : 'addProduct', component: AddProductComponent, canActivate: [AuthguardService]},
  { path : 'editProduct/:id', component: EditProductComponent, canActivate: [AuthguardService]},
  { path : 'logout', component: LogoutComponent},
  { path : 'cart', component: UserCartComponent, canActivate: [AuthguardService]},
  { path : 'products/:category', component: ProductListComponent },
  { path : 'product-detail/:id', component: ProductDetailsComponent },
  { path : 'products/:category/price1/price2', component: ProductListComponent },
  { path : '**', component: PageNotFoundComponent}
];

