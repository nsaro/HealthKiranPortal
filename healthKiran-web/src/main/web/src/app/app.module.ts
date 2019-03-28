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
import {AddCityDialog, CitiesComponent} from './adminConsole/cities/cities.component';
import { LabtestComponent } from './adminConsole/labtest/labtest.component';
import { LabsComponent } from './adminConsole/labs/labs.component';
import { EmailComponent } from './adminConsole/email/email.component';
import { ScheduleTestsComponent } from './adminConsole/schedule-tests/schedule-tests.component';
import { SmsComponent } from './adminConsole/sms/sms.component';
import { RegisteredUsersComponent } from './adminConsole/registered-users/registered-users.component';
import { ContactsComponent } from './adminConsole/contacts/contacts.component';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';

export function restClientConfigurationFactory() {
  return new Configuration({basePath: environment.backendBaseUrl, apiKeys: {}});
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CitiesComponent,
    LabtestComponent,
    LabsComponent,
    EmailComponent,
    ScheduleTestsComponent,
    SmsComponent,
    RegisteredUsersComponent,
    ContactsComponent,
    AddCityDialog
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
    MatDialogModule
  ],
  entryComponents: [
    AddCityDialog
  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
