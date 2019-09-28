import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ConsoleComponent } from './components/console/console.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { AttendenceHistoryComponent } from './components/attendence-history/attendence-history.component';
import { ChatComponent } from './components/chat/chat.component';
import { JobDetailComponent } from './components/job-detail/job-detail.component';
import {JobRequestsComponent} from "./components/job-requests/job-requests.component";
import {JobAssignedComponent} from "./components/job-assigned/job-assigned.component";

const routes: Routes = [
  {
    path : "",
    component : SignInComponent
  },
  {
    path : "admin",
    component : ConsoleComponent,
    children : [
      {
        path : "",
        component : DashboardComponent
      },
      {
        path : "user",
        component : UserComponent
      },
      {
        path : "invitation",
        component : InvitationComponent
      },
      {
        path : "timesheet",
        component: AttendenceHistoryComponent
      },
      {
        path : "chat",
        component: ChatComponent
      },
      {
        path : "job-location",
        component : JobDetailComponent
      },
      {
        path : "requests/:id",
        component : JobRequestsComponent
      },
      {
        path: 'job-assigned',
        component: JobAssignedComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
