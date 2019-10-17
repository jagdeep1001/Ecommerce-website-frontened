import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RegistrationService} from "../registration.service";
import {AuthenticationService} from "../authentication.service";
import {ProductsService} from "../products.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private role;
  private user;
  private result;
  private searchedItem: string;
  @Output() private childEvent = new EventEmitter();
  constructor(private registrationService: RegistrationService, private loginService: AuthenticationService,
              private productService: ProductsService) { }

  ngOnInit() {
    this.registrationService.getUser().subscribe( data => {
      this.user = data;
      this.role = this.user.role;
    });
  }

  searchOnClick() {
    console.log(this.searchedItem);
    // tslint:disable-next-line:triple-equals
    if (this.searchedItem != undefined && this.searchedItem != '') {
      this.productService.getSearchedResult(this.searchedItem).subscribe(data => {
        /*const object = {
          result: undefined,
          search: undefined
        };
        object.search = this.searchedItem;*/
        this.result = data;
        // this.products = data;
        this.childEvent.emit(this.result);
      });
    }
  }
}
