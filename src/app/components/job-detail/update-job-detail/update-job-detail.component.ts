import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JobLocationService } from '../../../services/job-location/job-location.service';

@Component({
  selector: 'app-update-job-detail',
  templateUrl: './update-job-detail.component.html',
  styleUrls: ['./update-job-detail.component.scss']
})
export class UpdateJobDetailComponent implements OnInit {

  spinner : boolean = false;
  minDate : string;

  fg = new FormGroup({
    location : new FormControl(this.data.location, [
      Validators.required
    ]),
    date : new FormControl(this.data.date, [
      Validators.required
    ]),
    start_time : new FormControl(this.data.start_time, [
      Validators.required
    ]),
    end_time : new FormControl(this.data.end_time, [
      Validators.required
    ]),
    status : new FormControl(this.data.status, [
      Validators.required
    ])
  })

  constructor(public dialogRef : MatDialogRef<UpdateJobDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private jobDetailService : JobLocationService,
              private snackbar : MatSnackBar) {
                let start_time = this.data.start_time.split(':');
                this.fg.get('start_time').setValue(start_time[0] + ':' + start_time[1]);
                let end_time = this.data.end_time.split(':');
                this.fg.get('end_time').setValue(end_time[0] + ':' + end_time[1]);
                let tDate = new Date();
                this.minDate = tDate.toISOString();
               }
              

  ngOnInit() {
  }

  updateJob() {
    if(typeof this.fg.value.date == 'object') {
      this.fg.get('date').setValue(this.getDate(this.fg.value.date));
    }
    this.spinner = true;
    this.jobDetailService.updateJobDetail(this.fg.value, this.data.id).subscribe(
      (resp) => {
        this.spinner = false;
        this.snackbar.open("Detail successfully updated", "", {
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
   return yyyy + '-' + mm + '-' + dd;
  }

  hasError(control: string, errorName: string) {
    return this.fg.get(control).hasError(errorName);
  }
}
