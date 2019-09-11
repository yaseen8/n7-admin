import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { JobLocationService } from '../../../services/job-location/job-location.service';

@Component({
  selector: 'app-add-job-detail',
  templateUrl: './add-job-detail.component.html',
  styleUrls: ['./add-job-detail.component.scss']
})
export class AddJobDetailComponent implements OnInit {

  spinner : boolean = false;
  userList : any = [];

  fg = new FormGroup({
    name : new FormControl('', [
      Validators.required
    ]),
    job_location : new FormControl('', [
      Validators.required
    ]),
    start_time : new FormControl('', [
      Validators.required
    ]),
    end_time : new FormControl('', [
      Validators.required
    ]),
    fk_user_id : new FormControl('', [
      Validators.required
    ])
  })

  constructor(public dialogRef : MatDialogRef<AddJobDetailComponent>,
              private userService  : UserService,
              private jobDetailService : JobLocationService,
              private snackbar : MatSnackBar) { }

  ngOnInit() {
  }

  searchUser(query) {
    if(query.length) {
      this.userService.searchUser(query).subscribe(
        (resp) => {
        this.userList = resp;
        }
      )
    }
    else {
      this.userList = [];
    }
  }

  onUserSelect(id) {
    if(id) {
      this.fg.get('fk_user_id').setValue(id);
    }
  }

  addJobDetail() {
    console.log(this.fg.value.fk_user_id);
    if(!this.fg.value.fk_user_id) {
      this.snackbar.open("Please select user from list", "", {
        duration : 3000
      });
      return false;
    }
    this.spinner = true;
    this.jobDetailService.addJobDetail(this.fg.value).subscribe(
      (resp) => {
        this.spinner = false;
        this.snackbar.open("Detail successfully added", "", {
          duration : 3000
        });
        this.dialogRef.close(resp);
      },
      (error) => {
        this.spinner = false;
        console.log(error);
        if(error['error'] === 'user already have job.') {
          this.snackbar.open("User already have job", "", {
            duration : 3000
          });
        }
        else {
        this.snackbar.open("Something went wrong", "", {
          duration : 3000
        });
      }
      }
    )
  }

  hasError(control: string, errorName: string) {
    return this.fg.get(control).hasError(errorName);
  }

}
