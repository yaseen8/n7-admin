import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService : ApiService,
              private http : HttpClient) { }
  
  getUserList() {
    return this.http.get(this.apiService.getRoute('user_list'));
  }

  searchUser(query) {
    return this.http.get(this.apiService.getRoute('search_user', {'query' : query}));
  }

  searchAllUser(query) {
    return this.http.get(this.apiService.getRoute('search_all_user', {'query' : query}));    
  }

  userSelectList() {
    return this.http.get(this.apiService.getRoute('user_select_list'));
  }

  loggedInUser() {
    return this.http.get(this.apiService.getRoute('logged_in_user'));
  }
}
