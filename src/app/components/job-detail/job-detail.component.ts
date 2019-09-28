import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobLocationService } from '../../services/job-location/job-location.service';
import { MatDialog } from '@angular/material';
import { UpdateJobDetailComponent } from './update-job-detail/update-job-detail.component';
import { AddJobDetailComponent } from './add-job-detail/add-job-detail.component';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

  displayedColumns = ['s_no','location', 'date','start_time','end_time','status','action'];
  filter: any = {};
  spinner: boolean = false;
  total = 0;
  pageSize = 0;
  jobLocationList : any = [];
  name : string;

  constructor(private activatedRoute : ActivatedRoute,
              private router : Router,
              private jobLocationService : JobLocationService,
              private dialog : MatDialog) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(qp => {
      if (qp.hasOwnProperty('page')) {
        this.filter['page'] = qp.page;
      }

      if (qp.hasOwnProperty('q')) {
        this.filter['q'] = qp.q;

      }
      this.getJobLocationList();
    });
  }

  getJobLocationList() {
    this.spinner = true;
    this.jobLocationService.getJobLocations().subscribe(
      (resp) => {
        this.spinner = false;
        this.jobLocationList = resp['data'];
        this.total = resp['total'];
        this.pageSize = resp['per_page'];
      },
      (error) => {
        this.spinner = false;
      }
    )
  }

  search(query) {
    if(query.length) {
      this.jobLocationService.searchJobs(query).subscribe(
        (resp) => {
        this.jobLocationList = resp['data'];
        this.total = resp['total'];
        this.pageSize = resp['per_page'];
        }
      )
    }
    else {
      this.getJobLocationList();
    }
  }

  update(obj, ind) {
    let dialogRef = this.dialog.open(UpdateJobDetailComponent, {
      width: '40%',
      data: obj
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
      this.getJobLocationList();
      }
    });
  }

  add() {
    let dialogRef = this.dialog.open(AddJobDetailComponent, {
      width: '40%',
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
      this.getJobLocationList();
      }
    });
  }

  job_requests(id) {
    this.router.navigate(['admin/requests/' + id]);
  }

  onPageChange(e) {
    let qp = Object.assign({}, this.activatedRoute.snapshot.queryParams);
    qp['page'] = e.pageIndex + 1;
    this.router.navigate(['.'], { relativeTo: this.activatedRoute, queryParams: qp });
  }
}
