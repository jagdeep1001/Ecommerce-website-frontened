import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Users} from './Users';
import {Observable} from 'rxjs';
import {RegistrationService} from './registration.service';

export class User {
  status: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private registrationService: RegistrationService) { }

  currentUser: Users;
  public admin: boolean;

  /*authenticate(username, password) {
    if (username === 'hiteshmunjal22@gmail.com' && password === 'password') {
      sessionStorage.setItem('username', username);
      return true;
    } else {
      return false;
    }
  }*/

  authenticate(username, password) {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.http.get('http://localhost:2019/validateLogin', {headers}).pipe(
      map(
        userData => {
          sessionStorage.setItem('username', username);
          const authString = 'Basic ' + btoa(username + ':' + password);
          sessionStorage.setItem('basicAuth', authString);
          return userData;
        }
      )
    );
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    console.log(!(user === null));
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
  }
  /*isUserAdmin() {
    this.registrationService.getUser().subscribe( data => this.currentUser = data);
    if (this.currentUser.role === 'Admin') {
      return true;
    }
    return false;
  }*/
}
