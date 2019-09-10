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
}
