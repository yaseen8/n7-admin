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
  minDate : string;

  fg = new FormGroup({
    location : new FormControl('', [
      Validators.required
    ]),
    date : new FormControl('', [
      Validators.required
    ]),
    start_time : new FormControl('', [
      Validators.required
    ]),
    end_time : new FormControl('', [
      Validators.required
    ]),
    status : new FormControl('open', [
      Validators.required
    ])
  })

  constructor(public dialogRef : MatDialogRef<AddJobDetailComponent>,
              private userService  : UserService,
              private jobDetailService : JobLocationService,
              private snackbar : MatSnackBar) { 

                let tDate = new Date();
                this.minDate = tDate.toISOString();
              }

  ngOnInit() {
  }

  addJobDetail() {
    this.fg.get('date').setValue(this.getDate(this.fg.value.date));
    this.spinner = true;
    this.jobDetailService.addJobDetail(this.fg.value).subscribe(
      (resp) => {
        this.spinner = false;
        this.snackbar.open("Job successfully added", "", {
          duration : 3000
        });
        this.dialogRef.close(resp);
      },
      (error) => {
        this.spinner = false;

        this.snackbar.open("Something went wrong", "", {
          duration : 3000
        });
      }
    )
  }

  getDate(date) {
    let dd = date['_i']['date'];
    let mm = date['_i']['month'] + 1;
    let yyyy = date['_i']['year'];
    if(dd <= 9) {
      dd = '0' + dd;
    }
    if(mm <= 9) {
      mm = '0' + mm;
    }
    return (yyyy + '-' + mm + '-' + dd);
  }

  hasError(control: string, errorName: string) {
    return this.fg.get(control).hasError(errorName);
  }

}
