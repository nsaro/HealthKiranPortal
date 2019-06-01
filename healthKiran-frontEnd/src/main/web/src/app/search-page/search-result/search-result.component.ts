import { Component, OnInit } from '@angular/core';
import {PriceBreakUpDialogComponent, TableData} from "../../price-break-up-dialog/price-break-up-dialog.component";
import {Lab} from "../../../generated/restClient";
import {BookingDialogComponent} from "../../booking-dialog/booking-dialog.component";
import {LabDetailsComponent} from "../../lab-details/lab-details.component";
import {MatDialog} from "@angular/material";
import {ActivatedRoute} from "@angular/router";

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
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {

  labs: Lab[] = [];
  labsToDisplay: LabToDisplay[] = [];
  testIds: number[] = [];
  tableDataMap = new Map();
  priceDataMap = new Map();

  constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute) {

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
}
