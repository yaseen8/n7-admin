import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InvitationService } from '../../../services/invitation/invitation.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-send-invitation',
  templateUrl: './send-invitation.component.html',
  styleUrls: ['./send-invitation.component.scss']
})
export class SendInvitationComponent implements OnInit {

  spinner : boolean = false;
  showError : boolean = false;
  fg = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email])
  })

  constructor(public dialogRef : MatDialogRef<SendInvitationComponent>,
              private invitationService : InvitationService,
              private snackbar : MatSnackBar) { }

  ngOnInit() {
  }

  checkExistingEmail() {
    this.spinner = true;
    this.showError = false;
    this.invitationService.checkExistingEmail(this.fg.value.email).subscribe(
      (resp : any) => {
        if(resp.length) {
          this.spinner = false;
          this.showError = true;
        }
        else {
          this.sendInvitation();
        }
      },
      (error) => {
      this.spinner = false;
      }
    )
  }

  sendInvitation() {
    let data = {
      'email' : this.fg.value.email
    }
    this.invitationService.sendInvitation(data).subscribe(
      (resp) => {
        this.spinner = false;
        if(resp) {
          this.snackbar.open("Invitation send on this email.", "", {
            duration: 3000
          });
          this.dialogRef.close(resp);
        }
      },
      (error) =>{
        this.spinner = false;
      }
    )
  }

  
  hasError(control: string, errorName: string) {
    return this.fg.get(control).hasError(errorName);
  }

}
