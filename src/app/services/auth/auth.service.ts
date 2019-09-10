import { Injectable } from '@angular/core';
import {TokenService} from "./token.service";
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { map } from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private tokenService: TokenService,
              private apiService : ApiService,
              private http : HttpClient) {
  }

  login(data) {
    return this.http.post(this.apiService.getRoute('admin_login'), data)
    .pipe(
      map(resp => {
        if (resp.hasOwnProperty("token")) {
          this.tokenService.setToken(resp["token"]);
        }
        return resp;
      })
    );
  }

  isAuthenticated() {
      let t = this.tokenService.getToken();
      return !!t && t.length > 0;
  }

  clearAuthorization() {
      this.tokenService.clearToken();
  }

  logout() {
    return this.http.post(this.apiService.getRoute('logout'), {}).pipe(map(resp => {
        this.clearAuthorization();
        return resp;
    }));
}


}
