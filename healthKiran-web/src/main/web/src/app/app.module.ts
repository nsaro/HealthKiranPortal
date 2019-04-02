import {BrowserModule,} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ApiModule, Configuration} from '../generated/restClient';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {LayoutModule} from '@angular/cdk/layout';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { NavBarComponent } from './adminConsole/nav-bar/nav-bar.component';
import {
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatCheckboxModule,
  MAT_DIALOG_DEFAULT_OPTIONS
} from '@angular/material';
import {AddCityDialog, CityComponent} from './adminConsole/cities/city.component';
import {TestComponent} from './adminConsole/test/test.component';
import { EmailComponent } from './adminConsole/email/email.component';
import { ScheduleTestsComponent } from './adminConsole/schedule-tests/schedule-tests.component';
import { SmsComponent } from './adminConsole/sms/sms.component';
import { RegisteredUsersComponent } from './adminConsole/registered-users/registered-users.component';
import { ContactsComponent } from './adminConsole/contacts/contacts.component';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {AddTestDialog} from "./adminConsole/test/add-test-dialog.component";
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {SelectLabTestDialog} from "./adminConsole/lab/select.lab.test.dialog.component";
import {LabAddEditDialog} from "./adminConsole/lab/lab.add.edit.dialog.component";
import {LabComponent} from "./adminConsole/lab/lab.component";

export function restClientConfigurationFactory() {
  return new Configuration({basePath: environment.backendBaseUrl, apiKeys: {}});
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CityComponent,
    TestComponent,
    EmailComponent,
    ScheduleTestsComponent,
    SmsComponent,
    RegisteredUsersComponent,
    ContactsComponent,
    LabComponent,
    AddCityDialog,
    AddTestDialog,
    LabAddEditDialog,
    SelectLabTestDialog
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ApiModule.forRoot(restClientConfigurationFactory),
    LayoutModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    MatStepperModule,
    MatSelectModule,
    MatDividerModule,
    MatGridListModule
  ],
  entryComponents: [
    AddCityDialog, AddTestDialog, SelectLabTestDialog, LabAddEditDialog
  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
