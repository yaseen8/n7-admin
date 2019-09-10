import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor(private apiService : ApiService,
              private http : HttpClient) { }
  
  getAttendenceList() {
    return this.http.get(this.apiService.getRoute('attendence_list'));
  }
}
