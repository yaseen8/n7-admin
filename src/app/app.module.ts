import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppUiModule } from "./app-ui.module";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HttpAuthInterceptor } from "./interceptors/http-auth.interceptor";
import { HttpAdditionalHeaderInterceptor } from "./interceptors/http-additional-header.interceptor";
// import { HttpErrorInterceptor } from "./interceptors/http-error.interceptor";
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DRIVERS, LockerModule } from "angular-safeguard";
import { ApiService } from './services/api.service';
import { ConsoleComponent } from './components/console/console.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { SendInvitationComponent } from './components/invitation/send-invitation/send-invitation.component';
import { AttendenceHistoryComponent } from './components/attendence-history/attendence-history.component';
import { ChatComponent } from './components/chat/chat.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import { UpdateJobDetailComponent } from './components/job-detail/update-job-detail/update-job-detail.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AddJobDetailComponent } from './components/job-detail/add-job-detail/add-job-detail.component';
const lockerConfig = {
  driverNamespace: "n7",
  driverFallback: [DRIVERS.SESSION, DRIVERS.LOCAL, DRIVERS.COOKIE],
  namespaceSeperator: "-"
};


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    ConsoleComponent,
    DashboardComponent,
    UserComponent,
    InvitationComponent,
    SendInvitationComponent,
    AttendenceHistoryComponent,
    ChatComponent,
    JobDetailComponent,
    UpdateJobDetailComponent,
    AddJobDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppUiModule,
    FormsModule,
    ReactiveFormsModule,
    LockerModule.withConfig(lockerConfig),
    HttpClientModule,
    NgxMaterialTimepickerModule
  ],
  providers: [  
    
    { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAdditionalHeaderInterceptor,
      multi: true
    },
    // { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ],
  entryComponents : [
    SendInvitationComponent,
    UpdateJobDetailComponent,
    AddJobDetailComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
