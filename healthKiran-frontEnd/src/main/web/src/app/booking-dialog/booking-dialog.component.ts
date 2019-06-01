import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatStepper} from "@angular/material";
import {TableData} from "../price-break-up-dialog/price-break-up-dialog.component";
import {Booking, BookingInformation, Lab, TestPrice} from "../../generated/restClient";
import {FormBuilder, Validators} from '@angular/forms';
import {FormControl, FormGroup} from "@angular/forms";
import {GenericService} from "../services/GenericService";
import {HttpErrorResponse} from "@angular/common/http";
import {BookingConfirmationDialogComponent} from "./booking-confirmation-dialog/booking-confirmation-dialog.component";

export interface TestPriceBooking {
  testName	: string;
  mrp: number;
  discount: number;
  total: number;
  specialRequirement: string;
}
@Component({
  selector: 'app-booking-dialog',
  templateUrl: './booking-dialog.component.html',
  styleUrls: ['./booking-dialog.component.scss']
})
export class BookingDialogComponent implements OnInit{

  labId: number;
  labName: string;
  labAddress: string;
  testPriceBooking:TestPriceBooking [] = [];
  displayedColumns: string[] = ['Test Name', 'MRP', 'Discount %', 'Payable', 'Special Req'];
  dataSource = this.testPriceBooking;
  totalPayable: number = 0;
  customerInfoFormGroup: FormGroup;
  minDate = new Date();
  testListStr: string = '';
  fullDateStr: string;
  time: string;
  labPhone: string;
  labContactPerson: string;
  testPrices: TestPrice [] = [];
  @ViewChild('stepper') stepper: MatStepper;
  constructor(public dialogRef: MatDialogRef<BookingDialogComponent>, public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: Map<Lab, TableData[]>, private _formBuilder: FormBuilder,) {
    data.forEach((testPriceTable: TableData[], lab: Lab) => {
      this.labName =  lab.name;
      this.labAddress = lab.address;
      this.labPhone = lab.phone;
      this.labContactPerson = lab.contactPerson;
      this.labId = lab.id;
      testPriceTable.forEach(priceTest => {
        this.testPriceBooking.push({testName: priceTest.testName,discount: priceTest.discount,
          mrp: priceTest.mrp, specialRequirement: priceTest.specialRequirement,
          total: priceTest.total});
        this.testListStr = this.testListStr + priceTest.testName + ", ";
        this.totalPayable = this.totalPayable +  priceTest.total;
        this.testPrices.push({name: priceTest.testName, price: priceTest.total});
      });
    });
  }
  ngOnInit() {
    this.customerInfoFormGroup = this._formBuilder.group({
      name: new FormControl('', [Validators.required]),
      date: new FormControl({value: new Date()},[Validators.required]),
      time: new FormControl('',[Validators.required]),
      mobile: new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      email: new FormControl('',[Validators.required, Validators.email])
    });
    this.customerInfoFormGroup.statusChanges.subscribe(
      status => {
        if (status === 'VALID') {
          let basicInfoData = this.customerInfoFormGroup.value;
          this.fullDateStr = basicInfoData.date.getDate() + "/" + (basicInfoData.date.getMonth()+ 1)
            + "/" + basicInfoData.date.getFullYear();
          this.time = basicInfoData.time;
        }
        console.log(status);
      }
    )
  }
  onClickSubmit() {
    let basicInfoData = this.customerInfoFormGroup.value;
    this.transferBookingInformation(basicInfoData);
  }

  private transferBookingInformation(basicInfoData: any) {
    const bookingInformation: BookingInformation = {
      labId: this.labId,
      labName: this.labName,
      labAddress: this.labAddress,
      labContactNumber: this.labPhone,
      labContactPerson: this.labContactPerson,
      testDate: this.fullDateStr,
      testTiming: basicInfoData.time,
      customerEmail: basicInfoData.email,
      customerName: basicInfoData.name,
      customerPhone: basicInfoData.mobile,
      totalAmount: this.totalPayable,
      testPrices: this.testPrices,
    }
    GenericService.instance.bookingInformationService.
    saveBooking(bookingInformation).toPromise()
      .then(booking => {
          this.dialogRef.close();
          this.openBookingConfirmationDialog(booking);
        },
        (e: HttpErrorResponse) => {
          console.log('HttpErrorResponse :: ' + e.message);
        }
      );
  }

  openBookingConfirmationDialog(booking: Booking): void {
    const dialogRef = this.dialog.open(BookingConfirmationDialogComponent, {
      width: '850px',
      data: booking,
      hasBackdrop: true
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
