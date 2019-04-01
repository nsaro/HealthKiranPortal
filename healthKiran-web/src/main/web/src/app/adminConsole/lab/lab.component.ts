import {Component, OnInit} from '@angular/core';
import {Booking, City, Lab, LabTest, Price, Test, WorkingHour} from "../../../generated/restClient";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {SelectLabTestDialog} from "./select.lab.test.dialog.component";
import {LabGenericService} from "./LabGenericService";
import {CityGenericService} from "../cities/CityGenericService";
import {HttpErrorResponse} from "@angular/common/http";
import {TestGenericService} from "../test/TestGenericService";


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
    selector: 'app-lab-test',
    templateUrl: './lab.component.html',
    styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {
    formData;
    cities: City[] = [];
    tests: Test[] = [];
    booleanValues: BooleanValue[] = [
        {value: 'Yes'},
        {value: 'No'}
    ];
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

    constructor(public dialog: MatDialog) {
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
        this.formData = new FormGroup({
            name: new FormControl(),
            area: new FormControl(),
            email: new FormControl(),
            phone: new FormControl(),
            address: new FormControl(),
            pinCode: new FormControl(),
            city: new FormControl(),
            offDay: new FormControl(),
            contactPerson: new FormControl(),
            certifiedBy: new FormControl(),
            vanFacility: new FormControl(),
            usualWorkingFromHour: new FormControl(),
            usualWorkingToHour: new FormControl(),
            usualWorkingFromMinute: new FormControl(),
            usualWorkingToMinute: new FormControl(),
            sundayWorkingFromHour: new FormControl(),
            sundayWorkingToHour: new FormControl(),
            sundayWorkingFromMinute: new FormControl(),
            sundayWorkingToMinute: new FormControl(),
            ultraSoundWorkingFromHour: new FormControl(),
            ultraSoundWorkingToHour: new FormControl(),
            ultraSoundWorkingFromMinute: new FormControl(),
            ultraSoundWorkingToMinute: new FormControl(),
            tests: new FormControl(),
            labTests: new FormControl(),
        });
        this.getAllCities();
        this.getAllTest();
    }

    onClickSubmit(data) {
        let lab = this.prepareLab(data);
        LabGenericService.labService.addLab(lab).toPromise()
            .then(
                Lab => {
                    console.log(Lab);
                    // CityGenericService.instance.updateTable();
                },
                (e: HttpErrorResponse) => {
                    console.log('HttpErrorResponse :: ' + e.message);
                }
            );
        console.log(lab);
    }

    private prepareLab(data) {
        let labTests: LabTest[] = [];
        let bookings: Booking[] = [];
        let city: City = this.getCityById(data.city);
        let usualWorkingHours: WorkingHour = {
            id: null, workingFromHour: Number(data.usualWorkingFromHour),
            workingFromMinute: Number(data.usualWorkingFromMinute),
            workingToHour: Number(data.usualWorkingToHour),
            workingToMinute: Number(data.usualWorkingToMinute)
        };
        let sundayWorkingHours: WorkingHour = {
            id: null, workingFromHour: Number(data.sundayWorkingFromHour),
            workingFromMinute: Number(data.sundayWorkingFromMinute),
            workingToHour: Number(data.sundayWorkingToHour),
            workingToMinute: Number(data.sundayWorkingToMinute)
        };
        let ultraSoundWorkingHours: WorkingHour = {
            id: null, workingFromHour: Number(data.ultraSoundWorkingFromHour),
            workingFromMinute: Number(data.ultraSoundWorkingFromMinute),
            workingToHour: Number(data.ultraSoundWorkingToHour),
            workingToMinute: Number(data.ultraSoundWorkingToMinute)
        };
        LabGenericService.instance.labTestTableData.forEach(labTest => {
            let price: Price = {id: null, originalPrice: labTest.price, discountPercentage: labTest.discountPercentage};
            const test: Test = this.getTestById(labTest.labId);
            let labTest: LabTest = {id: null, price: price, test: test};
            labTests.push(labTest);
        });

        let lab: Lab = {
            id: null,
            address: data.address,
            area: data.area,
            bookings: bookings,
            certifiedBy: data.certifiedBy,
            city: city,
            contactPerson: data.contactPerson,
            labTests: labTests,
            phone: data.phone,
            name: data.name,
            offDay: data.offDay,
            pinCode: data.pinCode,
            vanFacility: data.vanFacility,
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

}
