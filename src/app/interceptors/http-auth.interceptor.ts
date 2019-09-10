import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import { Observable } from "rxjs/index";
import { AuthService } from "../services/auth/auth.service";
import { TokenService } from "../services/auth/token.service";
import { DRIVERS, Locker } from "angular-safeguard";

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  constructor(
    private locker: Locker,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the auth token from the service.
    if (this.locker.has(DRIVERS.SESSION, 'auth-token')) {
        const authToken = 'Bearer ' + this.locker.get(DRIVERS.SESSION, 'auth-token');
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({setHeaders: {Authorization: authToken}});
        // send cloned request with header to the next handler.
        return next.handle(authReq);
    }
    return next.handle(req);
}

}
