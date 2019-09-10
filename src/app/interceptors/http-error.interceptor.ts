import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/observable/throw';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs/index";
import {MatSnackBar} from "@angular/material";
import {AuthService} from "../services/auth/auth.service";


@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router,
                private snackbar: MatSnackBar,
                private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).catch((err: HttpErrorResponse) => {
            if (err.error instanceof Error) {

            } else {
                // console.log(err);
                switch (err.status) {
                    case 401: {
                        if (this.authService.isAuthenticated()) {
                            this.snackbar.open('Token expired, please login again.', '', {
                                duration: 3000
                            });
                            this.router.navigate(['.']);
                            this.authService.clearAuthorization();
                        } else {
                            this.snackbar.open('You are not authorized to perform this action.', '', {
                                duration: 3000
                            })
                            this.router.navigate(['.']);
                        }
                    }
                        break;
                    case 404: {
                        // this.router.navigate(['/404']);
                    }
                        break;
                    case 500: {
                        // this.router.navigate(['/500']);
                    }
                        break;
                }
            }

            return Observable.throw(err);

        });
    }
}
