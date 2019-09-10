import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(private apiService : ApiService,
              private http : HttpClient) { }
  
  invitationList() {
    return this.http.get(this.apiService.getRoute('invitation_list'));
  }

  checkExistingEmail(email) {
    return this.http.get(this.apiService.getRoute('check_requested_email', {'email' : email}));
  }

  sendInvitation(email) {
    return this.http.post(this.apiService.getRoute('send_invitation'), email);
  }

  resendMail(data) {
    return this.http.post(this.apiService.getRoute('resend_mail'), data);
  }
}
