import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CitiesComponent} from "./adminConsole/cities/cities.component";
import {LabtestComponent} from "./adminConsole/labtest/labtest.component";
import {LabsComponent} from "./adminConsole/labs/labs.component";
import {EmailComponent} from "./adminConsole/email/email.component";
import {SmsComponent} from "./adminConsole/sms/sms.component";
import {RegisteredUsersComponent} from "./adminConsole/registered-users/registered-users.component";
import {ScheduleTestsComponent} from "./adminConsole/schedule-tests/schedule-tests.component";
import {ContactsComponent} from "./adminConsole/contacts/contacts.component";

const routes: Routes = [
  { path: 'cities', component: CitiesComponent },
  { path: 'labTests', component: LabtestComponent },
  { path: 'labs', component: LabsComponent },
  { path: 'email', component: EmailComponent },
  { path: 'sms', component: SmsComponent },
  { path: 'registeredUsers', component: RegisteredUsersComponent },
  { path: 'scheduledTests', component: ScheduleTestsComponent },
  { path: 'contacts', component: ContactsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
