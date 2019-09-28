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
    return this.http.get(this.apiService.getRoute('jobs'));
  }

  searchJobs(query) {
    return this.http.get(this.apiService.getRoute('search_jobs', {'query' : query}));
  }

  updateJobDetail(data, id) {
    return this.http.put(this.apiService.getRoute('job/' + id), data);
  }

  addJobDetail(data) {
    return this.http.post(this.apiService.getRoute('job'), data);
  }

  getJobRequests(id) {
    return this.http.get(this.apiService.getRoute('job_requests', {'job_id' : id}));
  }

  assignJob(data) {
    return this.http.post(this.apiService.getRoute('job_assign'), data);
  }
  getJobAssigned() {
    return this.http.get(this.apiService.getRoute('job_assigned'));
  }
}
