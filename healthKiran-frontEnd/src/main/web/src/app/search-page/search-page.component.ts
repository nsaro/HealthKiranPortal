import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {PriceBreakUpDialogComponent, TableData} from "../price-break-up-dialog/price-break-up-dialog.component";
import {GenericService} from "../services/GenericService";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {City, Test} from "../../generated/restClient";

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit{

  cityID: number;
  testIds: number[] = [];
  tableData: TableData[] = [];
  items = [ 1, 2, 3, 4, 5];
  cities: City[] = [];
  testList: Test[] = [];
  searchFormGroup: FormGroup;
  selectedTestOptions: number[] = [];
  constructor(public dialog: MatDialog) {
    this.getAllCities();
    this.getAllTests();
  }
  ngOnInit() {
    this.cityID = GenericService.instance.currentCityId;
    this.testIds = GenericService.instance.currentTestId;
    this.selectedTestOptions = this.testIds;
    this.searchFormGroup = new FormGroup({
      cityId: new FormControl(this.cityID, [Validators.required]),
      testIds: new FormControl(this.testIds, [Validators.required]),
    });
  }
  openPriceBreakUpDialog(): void {
    const dialogRef = this.dialog.open(PriceBreakUpDialogComponent, {
      width: '550px',
      data: { tableData : this.tableData },
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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
  };

}
