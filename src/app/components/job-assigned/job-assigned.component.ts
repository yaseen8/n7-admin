import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {JobLocationService} from "../../services/job-location/job-location.service";

@Component({
  selector: 'app-job-assigned',
  templateUrl: './job-assigned.component.html',
  styleUrls: ['./job-assigned.component.scss']
})
export class JobAssignedComponent implements OnInit {

  displayedColumns = ['s_no', 'location', 'user', 'mobile', 'job_time', 'assigned_on'];
  filter: any = {};
  loader = false;
  total = 0;
  pageSize = 0;
  assignedList: any = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private jobService: JobLocationService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(qp => {
      if (qp.hasOwnProperty('page')) {
        this.filter.page = qp.page;
      }

      if (qp.hasOwnProperty('q')) {
        this.filter.q = qp.q;

      }
      this.getAssignedJob();
    });
  }
  getAssignedJob() {
    this.loader = true;
    this.jobService.getJobAssigned().subscribe(
      (resp) => {
        this.assignedList = resp['data'];
        this.total = resp['total'];
        this.pageSize = resp['per_page'];
        this.loader = false;
      },
      (error) => {
        console.log(error);
      },
    );
  }
  onPageChange(e) {
    const qp = Object.assign({}, this.activatedRoute.snapshot.queryParams);
    qp.page = e.pageIndex + 1;
    this.router.navigate(['.'], { relativeTo: this.activatedRoute, queryParams: qp });
  }

}
