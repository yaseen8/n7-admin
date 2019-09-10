import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { TokenService } from '../../services/auth/token.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  animations: [
    trigger("growShrink", [
      state("inactive", style({ height: 0 })),
      state("active", style({ height: "*" })),
      transition("active => inactive", [
        style({ height: "*" }),
        animate(250, style({ height: 0 }))
      ]),
      transition("inactive => active", [
        style({ height: 0 }),
        animate(250, style({ height: "*" }))
      ])
    ])
  ]
})
export class SignInComponent implements OnInit {
  loading : boolean = false;
  fg = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    user_type : new FormControl('admin')
  });

  constructor(private authService : AuthService,
              private snackbar : MatSnackBar,
              private router : Router,
              private tokenService : TokenService) {
                if(this.authService.isAuthenticated()) {
                  this.router.navigate(["admin"]);
                }
               }

  ngOnInit() {
  }

  login() {
    this.loading = true;
    this.authService.login(this.fg.value).subscribe(
      (resp) => {
        console.log(resp);
        this.loading = false;
        this.router.navigate(['admin']);
      },
      (error) => {
        this.loading = false;
        this.snackbar.open("Invalid credentials, please try again.", "", {
          duration: 3000
        });
      }
    )
  }

}
