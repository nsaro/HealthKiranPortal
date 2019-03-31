import {Component, OnInit} from '@angular/core';
import {City} from "../../../generated/restClient";
import {FormControl, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material";
import {SelectLabTestDialog} from "./select.lab.test.dialog.component";
import {LabGenericService} from "./LabGenericService";


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

    constructor(public dialog: MatDialog,) {
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
            mobile: new FormControl(),
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
    }

    cities: City[] = [
        {id: 1, name: 'New Delhi'},
        {id: 2, name: 'Bangalore'},
        {id: 3, name: 'Hyderabad'}
    ];
    booleanValues: BooleanValue[] = [
        {value: 'Yes'},
        {value: 'No'}
    ];
    hours: Hour[] = [
        {hour: '01'}, {hour: '02'}, {hour: '03'}, {hour: '04'},
        {hour: '05'}, {hour: '06'}, {hour: '07'}, {hour: '08'},
        {hour: '09'}, {hour: '10'}, {hour: '11'}, {hour: '12'}, {hour: '13'}, {hour: '14'}, {hour: '15'}, {hour: '16'},
        {hour: '17'}, {hour: '18'}, {hour: '19'}, {hour: '20'}, {hour: '21'}, {hour: '22'}, {hour: '23'}, {hour: '24'}
    ];
    minutes: Minute[] = [
        {minute: '00'}, {minute: '15'}, {minute: '30'}, {minute: '45'}
    ];

    onClickSubmit(data) {
        console.log(data);
        console.log(LabGenericService.instance.labTestTableData);
    }
}
