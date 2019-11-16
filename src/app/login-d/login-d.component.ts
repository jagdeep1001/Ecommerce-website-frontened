import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";


@Component({
  selector: 'app-login-d',
  templateUrl: './login-d.component.html',
  styleUrls: ['./login-d.component.css']
})
export class LoginDComponent implements OnInit {
  username = '';
  password = '';
  invalidLogin = false;

  constructor(private router: Router, private loginservice: AuthenticationService) { }
  ngOnInit() {
  }
  checkLogin() {
    this.loginservice.authenticate(this.username, this.password).subscribe(data =>  {
        this.router.navigate(['home']);
        this.invalidLogin = false;
      }, error => {
        this.invalidLogin = true;
      }
    );
  }

}








