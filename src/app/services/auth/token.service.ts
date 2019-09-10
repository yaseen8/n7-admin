import { Injectable } from '@angular/core';
import {Locker, DRIVERS} from "angular-safeguard";
import {BehaviorSubject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  token : string;

    private loginStatus = new BehaviorSubject<string>('');
    loginStatusChange = this.loginStatus.asObservable();

    constructor(private locker: Locker) {
      this.token = this.locker.get(DRIVERS.SESSION, 'auth-token');
      if (this.token) {
          this.loginStatus.next('logged-in');
      }
  }

  setToken(token:string) {
    this.token = token;
    this.locker.set(DRIVERS.SESSION, 'auth-token', token);
    this.loginStatus.next('logged-in');
}


clearToken() {
    this.locker.remove(DRIVERS.SESSION, 'auth-token');
    this.token = '';
    this.loginStatus.next('logout');
}

getToken() {
    this.token = this.locker.get(DRIVERS.SESSION, 'auth-token');
    return this.token;
}

}
