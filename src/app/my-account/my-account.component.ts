import { Component, OnInit } from '@angular/core';
import {Users} from "../Users";
import {RegistrationService} from "../registration.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  user: Users;
  private name;
  private role;
  private address;
  private mobileNo;
  private email;
  private gender;
  constructor(private registrationService: RegistrationService, private router: Router) { }
  ngOnInit() {
    this.registrationService.getUser().subscribe( data => {
      console.log(data);
      this.user = data;
      this.email = this.user.email;
      this.name = this.user.name;
      this.mobileNo = this.user.mobileNo;
      this.gender = this.user.gender;
      this.address = this.user.address;
      this.role = this.user.role;
      console.log(this.user);
    });
  }

  editUser() {
    this.registrationService.editMyUser(this.user).subscribe(data => {
      this.user = data;
      alert('Details updated successfully.');
      this.router.navigate(['logout']);
    });
  }
}

