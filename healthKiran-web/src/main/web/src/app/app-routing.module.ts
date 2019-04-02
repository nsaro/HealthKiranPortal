import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CityComponent} from "./adminConsole/cities/city.component";
import {TestComponent} from "./adminConsole/test/test.component";
import {EmailComponent} from "./adminConsole/email/email.component";
import {SmsComponent} from "./adminConsole/sms/sms.component";
import {RegisteredUsersComponent} from "./adminConsole/registered-users/registered-users.component";
import {ScheduleTestsComponent} from "./adminConsole/schedule-tests/schedule-tests.component";
import {ContactsComponent} from "./adminConsole/contacts/contacts.component";
import {LabComponent} from "./adminConsole/lab/lab.component";

const routes: Routes = [
  { path: 'cities', component: CityComponent },
  { path: 'tests', component: TestComponent },
  { path: 'labs', component: LabComponent },
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
