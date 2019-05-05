import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material";
import {PriceBreakUpDialogComponent, TableData} from "../price-break-up-dialog/price-break-up-dialog.component";
import {GenericService} from "../services/GenericService";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {City, Lab, LabTest, Test} from "../../generated/restClient";
import {ActivatedRoute} from "@angular/router";
import 'rxjs/add/operator/map';
import {LabDetailsComponent} from "../lab-details/lab-details.component";
import {BookingDialogComponent} from "../booking-dialog/booking-dialog.component";

export interface PriceSection {
  testName	: string;
  totalBeforePrice: number;
  totalDiscount: number;
  totalFinalPrice: number;
  specialRequirement: string;
}
export interface LabToDisplay {
  lab: Lab;
  priceSection: PriceSection;
}
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  cityID: number;
  testIds: number[] = [];
  tableDataMap = new Map();
  priceDataMap = new Map();
  labs: Lab[] = [];
  cities: City[] = [];
  testList: Test[] = [];
  searchFormGroup: FormGroup;
  selectedTestOptions: number[] = [];
  labsToDisplay: LabToDisplay[] = [];

  constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute) {
    this.getAllCities();
    this.getAllTests();
    this.cityID = GenericService.instance.currentCityId;
    this.testIds = GenericService.instance.currentTestId;
    this.selectedTestOptions = this.testIds;
    this.searchFormGroup = new FormGroup({
      cityId: new FormControl(this.cityID, [Validators.required]),
      testIds: new FormControl(this.testIds, [Validators.required]),
    });
    this.activatedRoute.data.map(data => data.cres).subscribe((result) => {
      console.log(result);
      this.labs = result;
      this.labs.forEach(lab => {
        let tableDataList: TableData[] = [];
        lab.labTests.forEach(labTest => {
          for (let i = 0; i < this.testIds.length; i++) {
            if (this.testIds[i] === labTest.test.id) {
              let tableData: TableData = {
                testName: labTest.test.name,
                mrp: labTest.price.originalPrice,
                discount: labTest.price.discountPercentage,
                total: labTest.price.finalPrice,
                specialRequirement: labTest.test.specialRequirements
              };
              tableDataList.push(tableData);
              this.priceDataMap.set(lab.id, tableDataList);
            }
          }
        });
        this.tableDataMap.set(lab.id, tableDataList);
      });
    });
    this.labs.forEach(lab => {
      this.labsToDisplay.push({lab: lab, priceSection: this.getPriceSectionForALab(lab.id)});
    });
  }

  ngOnInit() {
  }

  openPriceBreakUpDialog(labId: number): void {
    let testTableData = this.tableDataMap.get(labId);
    const dialogRef = this.dialog.open(PriceBreakUpDialogComponent, {
      width: '550px',
      data: {testTableData: testTableData},
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openLabBookingDialog(labId: number): void {
    let lab: Lab = this.labs.find(function(lab) {
      return (lab.id === labId);
    });
    let labTestPriceDetailMap = new Map();
    let tableDataList: TableData[] = this.priceDataMap.get(labId);
    labTestPriceDetailMap.set(lab, tableDataList);
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      width: '850px',
      data: labTestPriceDetailMap,
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getPriceSectionForALab(labId: number) {
    let tableData: TableData[] = this.priceDataMap.get(labId);
    let totalBeforePrice = 0;
    let totalDiscount;
    let totalFinalPrice = 0;
    let testName;
    let specialRequirement: string;
    tableData.forEach(tableData => {
      totalBeforePrice = totalBeforePrice + tableData.mrp;
      totalFinalPrice =  totalFinalPrice + tableData.total;
      testName = tableData.testName;
      specialRequirement = tableData.specialRequirement;
    });
    totalDiscount = 100 - ((totalFinalPrice/totalBeforePrice) * 100);
    totalDiscount = totalDiscount.toFixed(0);
    let priceSection: PriceSection = {totalBeforePrice: totalBeforePrice,
      totalDiscount: totalDiscount,
      totalFinalPrice:totalFinalPrice,
      testName: testName,
      specialRequirement: specialRequirement
    };
    return priceSection;
  }
  openLabDetails(labId: number): void {

    let currentLab: Lab = {};
    this.labs.forEach(lab => {
      if (lab.id === labId) {
        currentLab = lab;
      }
    });

    const dialogRef = this.dialog.open(LabDetailsComponent, {
      width: '850px',
      data: {
        descriptionTable: {
          labName: currentLab.name,
          labDescription: currentLab.description,
          facility: currentLab.facility,
          email: currentLab.email,
          vanFacility: currentLab.vanFacility,
          offDay: currentLab.offDay,
          usualWorkingHours: currentLab.usualWorkingHours,
          sundayWorkingHours: currentLab.sundayWorkingHours,
          ultraSoundWorkingHours: currentLab.ultraSoundWorkingHours
        }
      },
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
