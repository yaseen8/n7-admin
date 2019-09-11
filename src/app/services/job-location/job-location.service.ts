import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JobLocationService {

  constructor(private apiService : ApiService,
              private http : HttpClient) { }
  
  getJobLocations() {
    return this.http.get(this.apiService.getRoute('job_detail_list'));
  }

  searchJobByUser(name) {
    return this.http.get(this.apiService.getRoute('job_by_user', {'name' : name}));
  }

  updateJobDetail(data, id) {
    return this.http.put(this.apiService.getRoute('job_detail/' + id), data);
  }

  addJobDetail(data) {
    return this.http.post(this.apiService.getRoute('job_detail'), data);
  }
}
