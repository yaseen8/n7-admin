import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent implements OnInit {
  spinner : boolean = false;

  constructor(private authService : AuthService,
              private router : Router,
              private snackbar : MatSnackBar) { }

  ngOnInit() {
  }

  performLogout() {
    this.spinner = true;
    this.authService.logout().subscribe(
      (resp) => {
        this.spinner = false;
        this.router.navigate(['.']);
        this.snackbar.open("Logout successfully", "", {
          duration: 3000
        })
      },
      (error) => {
        this.spinner = false;
        this.snackbar.open("Something went wrong", "", {
          duration: 3000
        })
      }
    )
  }

}
