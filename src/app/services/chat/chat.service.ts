import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http : HttpClient,
              private apiService : ApiService) { }
  
  getUserChat(data) {
    return this.http.get(this.apiService.getRoute('get_user_chat', {'chat_from' : data.adminId, 'chat_to' : data.userId, 'user_type' : data.userType}));
  }

  addMessage(data) {
    return this.http.post(this.apiService.getRoute('add_admin_message'), data);
  }
}
