import {Component, Inject, OnInit} from '@angular/core';
import {Booking, City, Lab, LabTest, Price, Test, WorkingHour} from "../../../generated/restClient";
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {LabGenericService} from "./LabGenericService";
import {CityGenericService} from "../cities/CityGenericService";
import {HttpErrorResponse} from "@angular/common/http";
import {TestGenericService} from "../test/TestGenericService";
import {FormBuilder, Validators} from '@angular/forms';
import {SelectLabTestDialog} from "./select.lab.test.dialog.component";

export interface Hour {
    hour: string;
}

export interface Minute {
    minute: string;
}

export interface BooleanValue {
    value: string;
}

@Component({
    selector: 'app-lab-add-edit-dialog',
    templateUrl: './lab.add.edit.dialog.component.html',
    styleUrls: ['./lab.component.css']
})
export class LabAddEditDialog implements OnInit {
    cities: City[] = [];
    tests: Test[] = [];
    booleanValues: BooleanValue[] = [
        {value: 'Yes'},
        {value: 'No'}
    ];
    firstFormGroup: FormGroup;
    secondFormGroup: FormGroup;
    hours: Hour[] = [
        {hour: '01'}, {hour: '02'}, {hour: '03'}, {hour: '04'},
        {hour: '05'}, {hour: '06'}, {hour: '07'}, {hour: '08'},
        {hour: '09'}, {hour: '10'}, {hour: '11'}, {hour: '12'},
        {hour: '13'}, {hour: '14'}, {hour: '15'}, {hour: '16'},
        {hour: '17'}, {hour: '18'}, {hour: '19'}, {hour: '20'},
        {hour: '21'}, {hour: '22'}, {hour: '23'}, {hour: '24'}
    ];
    minutes: Minute[] = [
        {minute: '00'}, {minute: '15'}, {minute: '30'}, {minute: '45'}
    ];

    name = new FormControl('', [Validators.required]);
    area = new FormControl('', [Validators.required]);
    email = new FormControl('', [Validators.required, Validators.email]);
    phone = new FormControl('', [Validators.required, Validators.minLength(10)]);
    address = new FormControl('', [Validators.required]);
    city = new FormControl('', [Validators.required]);
    pinCode = new FormControl('', [Validators.required, Validators.minLength(6)]);
    vanFacility = new FormControl('', [Validators.required]);

    constructor(public dialog: MatDialog,
                public dialogRef: MatDialogRef<SelectLabTestDialog>,
                @Inject(MAT_DIALOG_DATA) public lab: Lab,
                private _formBuilder: FormBuilder) {
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(SelectLabTestDialog, {
            width: '850px',
            data: {
                value1: 'One',
                value2: 'Two',
            },
            hasBackdrop: true
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed : ' + result);
        });
    }

    ngOnInit() {


        this.firstFormGroup = this._formBuilder.group({
            name: this.name,
            area: this.area,
            email: this.email,
            phone: this.phone,
            address: this.address,
            pinCode: this.pinCode,
            city: this.city,
            offDay: new FormControl(),
            contactPerson: new FormControl(),
            certifiedBy: new FormControl(),
            vanFacility: this.vanFacility,
        });
        this.secondFormGroup = this._formBuilder.group({
            usualWorkingFromHour: new FormControl('', [Validators.required]),
            usualWorkingToHour: new FormControl('', [Validators.required]),
            usualWorkingFromMinute: new FormControl('', [Validators.required]),
            usualWorkingToMinute: new FormControl('', [Validators.required]),
            sundayWorkingFromHour: new FormControl(),
            sundayWorkingToHour: new FormControl(),
            sundayWorkingFromMinute: new FormControl(),
            sundayWorkingToMinute: new FormControl(),
            ultraSoundWorkingFromHour: new FormControl(),
            ultraSoundWorkingToHour: new FormControl(),
            ultraSoundWorkingFromMinute: new FormControl(),
            ultraSoundWorkingToMinute: new FormControl()
        });
        this.getAllCities();
        this.getAllTest();
    }

    onClickSubmit() {
        let lab = this.prepareLab();
        LabGenericService.labService.addLab(lab).toPromise()
            .then(
                Lab => {
                    console.log(Lab);
                    this.closeDialog();
                    // CityGenericService.instance.updateTable();
                },
                (e: HttpErrorResponse) => {
                    console.log('HttpErrorResponse :: ' + e.message);
                }
            );
        console.log(lab);
        LabGenericService.instance.updateLabsTable();
    }

    private prepareLab() {
        let basicInfoData = this.firstFormGroup.value;
        let timingInfoData = this.secondFormGroup.value;
        let labTests: LabTest[] = [];
        let bookings: Booking[] = [];
        let city: City = this.getCityById(basicInfoData.city);

        let usualWorkingHours: WorkingHour = {
            id: null, workingFromHour: Number(timingInfoData.usualWorkingFromHour),
            workingFromMinute: Number(timingInfoData.usualWorkingFromMinute),
            workingToHour: Number(timingInfoData.usualWorkingToHour),
            workingToMinute: Number(timingInfoData.usualWorkingToMinute)
        };
        let sundayWorkingHours: WorkingHour = {
            id: null, workingFromHour: Number(timingInfoData.sundayWorkingFromHour),
            workingFromMinute: Number(timingInfoData.sundayWorkingFromMinute),
            workingToHour: Number(timingInfoData.sundayWorkingToHour),
            workingToMinute: Number(timingInfoData.sundayWorkingToMinute)
        };
        let ultraSoundWorkingHours: WorkingHour = {
            id: null, workingFromHour: Number(timingInfoData.ultraSoundWorkingFromHour),
            workingFromMinute: Number(timingInfoData.ultraSoundWorkingFromMinute),
            workingToHour: Number(timingInfoData.ultraSoundWorkingToHour),
            workingToMinute: Number(timingInfoData.ultraSoundWorkingToMinute)
        };
        LabGenericService.instance.labTestTableData.forEach(labTest => {
            let price: Price = {id: null, originalPrice: Number(labTest.price),
                discountPercentage: Number(labTest.discountPercentage)};
            const test: Test = this.getTestById(labTest.labId);
            let labTestObj: LabTest = {id: null, price: price, test: test};
            labTests.push(labTestObj);
        });

        let lab: Lab = {
            id: null,
            address: basicInfoData.address,
            area: basicInfoData.area,
            bookings: bookings,
            certifiedBy: basicInfoData.certifiedBy,
            city: city,
            contactPerson: basicInfoData.contactPerson,
            labTests: labTests,
            phone: basicInfoData.phone,
            name: basicInfoData.name,
            offDay: basicInfoData.offDay,
            pinCode: basicInfoData.pinCode,
            vanFacility: basicInfoData.vanFacility,
            sundayWorkingHours: sundayWorkingHours,
            usualWorkingHours: usualWorkingHours,
            ultraSoundWorkingHours: ultraSoundWorkingHours
        }
        return lab;
    }

    private getAllCities() {
        CityGenericService.cityService.getAllCities().toPromise()
            .then(
                data => {
                    this.cities = data;
                },
                (e: HttpErrorResponse) => {
                    console.log('HttpErrorResponse :: ' + e.message);
                }
            );
    }
    private getAllTest(){
        TestGenericService.testService.getAllTests().toPromise()
            .then(
                data => {
                    this.tests = data;
                },
                (e: HttpErrorResponse) => {
                    console.log('HttpErrorResponse :: ' + e.message);
                }
            );
    }
    private getTestById(id: number): Test{
        const test:Test = this.tests.find( item => item.id === id);
        return test;
    }

    private getCityById(id: number): Test{
        const city:City = this.cities.find( item => item.id === id);
        return city;
    }

    getErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a value' :
            this.email.hasError('email') ? 'Not a valid email' :
                '';
    }
    closeDialog(): void {
        this.dialogRef.close();
    }
}
