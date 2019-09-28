import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JobLocationService} from '../../services/job-location/job-location.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-job-requests',
  templateUrl: './job-requests.component.html',
  styleUrls: ['./job-requests.component.scss']
})
export class JobRequestsComponent implements OnInit {
  displayedColumns = ['s_no', 'location', 'user', 'mobile', 'job_time', 'request_on', 'action'];
  filter: any = {};
  loader = false;
  total = 0;
  pageSize = 0;
  requestList: any = [];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private jobLocationService: JobLocationService,
              private snackbar: MatSnackBar) {
              this.getJobRequest(this.activatedRoute.snapshot.paramMap.get('id'));
  }


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(qp => {
      if (qp.hasOwnProperty('page')) {
        this.filter.page = qp.page;
      }

      if (qp.hasOwnProperty('q')) {
        this.filter.q = qp.q;

      }
    });
  }

  getJobRequest(id) {
    this.loader = true;
    this.jobLocationService.getJobRequests(id).subscribe(
      (resp) => {
        this.requestList = resp['data'];
        this.total = resp['total'];
        this.pageSize = resp['per_page'];
        this.loader = false;
      },
      (error) => {
        console.log(error);
      },
    );
  }

  assignJob(obj) {
    this.loader = true;
    const data = {
      user_id : obj.user_id,
      job_id : obj.job_id
    };
    this.jobLocationService.assignJob(data).subscribe(
      (resp) => {
        this.loader = false;
        this.snackbar.open('Job Assign Successfully', '',{
          duration: 3000
        })
      }
    );
  }

  onPageChange(e) {
    const qp = Object.assign({}, this.activatedRoute.snapshot.queryParams);
    qp.page = e.pageIndex + 1;
    this.router.navigate(['.'], { relativeTo: this.activatedRoute, queryParams: qp });
  }


}
