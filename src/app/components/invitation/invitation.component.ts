import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvitationService } from '../../services/invitation/invitation.service';
import { SendInvitationComponent } from './send-invitation/send-invitation.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {

  displayedColumns = ['s_no', 'email','action'];
  filter: any = {};
  spinner: boolean = false;
  total = 0;
  pageSize = 0;
  inviteList : any = [];

  constructor(private activatedRoute : ActivatedRoute,
              private router : Router,
              private invitationService : InvitationService,
              private dialog : MatDialog,
              private snackbar : MatSnackBar) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(qp => {
      if (qp.hasOwnProperty('page')) {
        this.filter['page'] = qp.page;
      }

      if (qp.hasOwnProperty('q')) {
        this.filter['q'] = qp.q;

      }
      this.getInvitationList();
    });
  }

  getInvitationList() {
    this.spinner = true;
    this.invitationService.invitationList().subscribe(
      (resp) => {
        this.spinner = false;
        this.inviteList = resp['data'];
        this.total = resp['total'];
        this.pageSize = resp['per_page'];
      },
      (error) => {
        this.spinner = false
      }
    )
  }

  sendInvitation() {
    let dialogRef = this.dialog.open(SendInvitationComponent, {
      width: '40%',
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        console.log(resp);
        this.getInvitationList();
      }
    });
  }

  resendMail(data) {
    console.log(data);
    let mail = {
      'email' : data.email
    }
    this.spinner = true;
    this.invitationService.resendMail(mail).subscribe(
      (resp) => {
        this.spinner = false;
          this.snackbar.open("Invitation send successfully", "", {
            duration : 3000
          })
        
      },
      (error) => {
        this.spinner = false;
        this.snackbar.open("Something went wrong", "", {
          duration : 3000
        })
      }
    )
  }

  search(query) {
    if(query) {
      this.invitationService.searchByEmail(query).subscribe(
        (resp) => {
          this.inviteList = resp['data'];
          this.total = resp['total'];
          this.pageSize = resp['per_page'];
        }
      )
    }
    else {
      this.getInvitationList();
    }
  }

  onPageChange(e) {
    let qp = Object.assign({}, this.activatedRoute.snapshot.queryParams);
    qp['page'] = e.pageIndex + 1;
    this.router.navigate(['.'], { relativeTo: this.activatedRoute, queryParams: qp });
  }

}
