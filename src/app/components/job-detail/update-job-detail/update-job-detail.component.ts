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

  fg = new FormGroup({
    location : new FormControl(this.data.job_location, [
      Validators.required
    ]),
    start_time : new FormControl(this.data.start_time, [
      Validators.required
    ]),
    end_time : new FormControl(this.data.end_time, [
      Validators.required
    ]),
    fk_user_id : new FormControl(this.data.fk_user_id, [
      Validators.required
    ])
  })

  constructor(public dialogRef : MatDialogRef<UpdateJobDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private jobDetailService : JobLocationService,
              private snackbar : MatSnackBar) {
                let start_time = this.data.start_time.split(':');
                this.data.start_time = start_time[0] + ':' + start_time[1];
                let end_time = this.data.end_time.split(':');
                this.data.end_time = end_time[0] + ':' + end_time[1];
               }
              

  ngOnInit() {
  }

  updateJobDetail() {
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

  hasError(control: string, errorName: string) {
    return this.fg.get(control).hasError(errorName);
  }
}
