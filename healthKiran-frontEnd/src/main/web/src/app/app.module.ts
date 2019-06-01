import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule, MatInputModule, MatNativeDateModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { PriceBreakUpDialogComponent } from './price-break-up-dialog/price-break-up-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ApiModule, Configuration} from '../generated/restClient';
import {environment} from "../environments/environment";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LabDetailsComponent } from './lab-details/lab-details.component';
import { BookingDialogComponent } from './booking-dialog/booking-dialog.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { LoaderComponent } from './loader/loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from './services/loader.service';
import {LoaderInterceptor} from "./loader.interceptor";
import { BookingConfirmationDialogComponent } from './booking-dialog/booking-confirmation-dialog/booking-confirmation-dialog.component';
import { SearchResultComponent } from './search-page/search-result/search-result.component';

export function restClientConfigurationFactory() {
  return new Configuration({basePath: environment.backendBaseUrl, apiKeys: {}});
}
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SearchPageComponent,
    PriceBreakUpDialogComponent,
    LabDetailsComponent,
    BookingDialogComponent,
    LoaderComponent,
    BookingConfirmationDialogComponent,
    SearchResultComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ApiModule.forRoot(restClientConfigurationFactory),
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatTableModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [MatDatepickerModule, LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [PriceBreakUpDialogComponent, LabDetailsComponent, BookingDialogComponent, BookingConfirmationDialogComponent]
})
export class AppModule { }
