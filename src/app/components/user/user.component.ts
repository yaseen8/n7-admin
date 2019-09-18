import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  displayedColumns = ['s_no', 'name', 'surname', 'email', 'dob', 'mobile', 'address', 'nok_name', 'nok_contact','action'];
  filter: any = {};
  spinner: boolean = false;
  total = 0;
  pageSize = 0;
  userList : any = [];
  name : string;

  constructor(private userService : UserService,
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
      this.getUserList();
    });
  }

  getUserList() {
    this.spinner = true;
    this.userService.getUserList().subscribe(
      (resp) => {
        this.spinner = false;
        console.log(resp);
        this.userList = resp['data'];
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
      this.userService.searchAllUser(query).subscribe(
        (resp) => {
        this.userList = resp['data'];
        this.total = resp['total'];
        this.pageSize = resp['per_page'];
        }
      )
    }
    else {
      this.getUserList();
    }
  }

  onPageChange(e) {
    let qp = Object.assign({}, this.activatedRoute.snapshot.queryParams);
    qp['page'] = e.pageIndex + 1;
    this.router.navigate(['.'], { relativeTo: this.activatedRoute, queryParams: qp });
  }

}
