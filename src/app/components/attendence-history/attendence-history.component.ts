import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../../services/timesheet/timesheet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-attendence-history',
  templateUrl: './attendence-history.component.html',
  styleUrls: ['./attendence-history.component.scss']
})
export class AttendenceHistoryComponent implements OnInit {

  displayedColumns = ['s_no','user', 'check_in','check_out', 'check_in_loc','check_out_loc'];
  filter: any = {};
  spinner: boolean = false;
  total = 0;
  pageSize = 0;
  timesheetList : any = [];

  constructor(private timesheetService : TimesheetService,
              private activatedRoute : ActivatedRoute,
              private router : Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(qp => {
      if (qp.hasOwnProperty('page')) {
        this.filter['page'] = qp.page;
      }

      if (qp.hasOwnProperty('q')) {
        this.filter['q'] = qp.q;

      }
      this.getTimesheetList();
    });
  }

  getTimesheetList(){
    this.spinner = true;
    this.timesheetService.getAttendenceList().subscribe(
      (resp) => {
        this.spinner = false;
        this.timesheetList = resp['data'];
        this.total = resp['total'];
        this.pageSize = resp['per_page'];
      },
      (error) => {
        this.spinner = false;
      }
    )
  }

  
  onPageChange(e) {
    let qp = Object.assign({}, this.activatedRoute.snapshot.queryParams);
    qp['page'] = e.pageIndex + 1;
    this.router.navigate(['.'], { relativeTo: this.activatedRoute, queryParams: qp });
  }

}
