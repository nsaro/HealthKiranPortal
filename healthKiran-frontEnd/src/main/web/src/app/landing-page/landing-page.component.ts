import {Component, OnInit} from '@angular/core';
import {City, Test} from "../../generated/restClient";
import {HttpErrorResponse} from "@angular/common/http";
import {GenericService} from "../services/GenericService";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  cities: City[] = [];
  testList: Test[] = [];
  searchFormGroup: FormGroup;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.getAllCities();
    this.getAllTests();
    this.searchFormGroup = new FormGroup({
      cityId: new FormControl(null, [Validators.required]),
      testIds: new FormControl(null, [Validators.required]),
    });
  }

  private getAllCities() {
    GenericService.instance.cityService.getAllCities().toPromise()
      .then(
        data => {
          this.cities = data;
        },
        (e: HttpErrorResponse) => {
          console.log('HttpErrorResponse :: ' + e.message);
        }
      );

  }

  private getAllTests() {
    GenericService.instance.testService.getAllTests().toPromise()
      .then(
        data => {
          this.testList = data;
        },
        (e: HttpErrorResponse) => {
          console.log('HttpErrorResponse :: ' + e.message);
        }
      );
  }

  onClickSubmit(data) {
    GenericService.instance.currentCityId = data.cityId;
    GenericService.instance.currentTestId = data.testIds;
    this.router.navigate(['/search']);
  };
}
