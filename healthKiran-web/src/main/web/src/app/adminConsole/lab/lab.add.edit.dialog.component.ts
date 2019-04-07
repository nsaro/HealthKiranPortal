import {Component, Inject, OnInit} from '@angular/core';
import {Booking, City, Lab, LabTest, Price, Test} from "../../../generated/restClient";
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import {LabGenericService} from "./LabGenericService";
import {CityGenericService} from "../cities/CityGenericService";
import {HttpErrorResponse} from "@angular/common/http";
import {TestGenericService} from "../test/TestGenericService";
import {FormBuilder, Validators} from '@angular/forms';
import {SelectLabTestDialog} from "./select.lab.test.dialog.component";

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
    lab: Lab = {};
    placeHolder : string = 'Enter';
    numberOfTests = 0;

    constructor(public dialog: MatDialog,
                public dialogRef: MatDialogRef<SelectLabTestDialog>,
                @Inject(MAT_DIALOG_DATA) public labObj: any,
                private _formBuilder: FormBuilder,  private labGenericService: LabGenericService) {
        if(labObj.lab) {
            this.placeHolder = 'Update';
            this.lab = labObj.lab;
            this.numberOfTests = this.lab.labTests.length;
        }
        labGenericService.updateTestCountOnBadge.subscribe(count => {
            this.updateNumberOfTests(count);
        });
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(SelectLabTestDialog, {
            width: '850px',
            data: {labTests: this.lab.labTests},
            hasBackdrop: true
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed : ' + result);
        });
    }

    ngOnInit() {

        this.firstFormGroup = this._formBuilder.group({
            id: new FormControl(this.lab.id),
            name: new FormControl(this.lab.name, [Validators.required]),
            area: new FormControl(this.lab.area, [Validators.required]),
            facility: new FormControl(this.lab.facility, [Validators.required]),
            description : new FormControl(this.lab.description),
            email: new FormControl(this.lab.email, [Validators.required, Validators.email]),
            phone: new FormControl(this.lab.phone, [Validators.required, Validators.minLength(10)]),
            address: new FormControl(this.lab.address, [Validators.required]),
            pinCode: new FormControl(this.lab.pinCode, [Validators.required, Validators.minLength(6)]),
            city: new FormControl((this.lab.city) ? this.lab.city.id : '', [Validators.required]),
            contactPerson: new FormControl(this.lab.contactPerson),
            certifiedBy: new FormControl(this.lab.certifiedBy),
            vanFacility: new FormControl(this.lab.vanFacility, [Validators.required]),
        });

        this.secondFormGroup = this._formBuilder.group({
            usualWorkingHours: new FormControl(this.lab.usualWorkingHours, [Validators.required]),
            sundayWorkingHours: new FormControl(this.lab.sundayWorkingHours),
            ultraSoundWorkingHours: new FormControl(this.lab.ultraSoundWorkingHours),
            offDay: new FormControl(this.lab.offDay)
        });
        this.getAllCities();
        this.getAllTest();
    }

    onClickSubmit() {
        let lab = this.prepareLab();
        if(lab.id){
            LabGenericService.labService.updateLab(lab).toPromise()
                .then(
                    Lab => {
                        console.log(Lab);
                        this.closeDialog();
                        LabGenericService.instance.updateLabsTable();
                    },
                    (e: HttpErrorResponse) => {
                        console.log('HttpErrorResponse :: ' + e.message);
                    }
                );
        } else {
            LabGenericService.labService.addLab(lab).toPromise()
                .then(
                    Lab => {
                        console.log(Lab);
                        this.closeDialog();
                        LabGenericService.instance.updateLabsTable();
                    },
                    (e: HttpErrorResponse) => {
                        console.log('HttpErrorResponse :: ' + e.message);
                    }
                );
        }

    }

    private prepareLab() {
        let basicInfoData = this.firstFormGroup.value;
        let timingInfoData = this.secondFormGroup.value;
        let labTests: LabTest[] = [];
        let bookings: Booking[] = [];
        let city: City = this.getCityById(basicInfoData.city);

        LabGenericService.instance.labTestTableData.forEach(labTest => {
            let price: Price = {id: (labTest.priceObjId) ? labTest.priceObjId : null, originalPrice: Number(labTest.price),
                discountPercentage: Number(labTest.discountPercentage)};
            let testID = (labTest.testObjId) ? labTest.testObjId : null;
            const test: Test = this.getTestById(testID);
            let labTestObj: LabTest = {id : (labTest.labTestId) ? labTest.labTestId : null, price: price, test: test};
            labTests.push(labTestObj);
        });

        let lab: Lab = {
            id: basicInfoData.id,
            address: basicInfoData.address,
            area: basicInfoData.area,
            bookings: bookings,
            certifiedBy: basicInfoData.certifiedBy,
            email: basicInfoData.email,
            city: city,
            facility: basicInfoData.facility,
            description: basicInfoData.description,
            contactPerson: basicInfoData.contactPerson,
            labTests: labTests,
            phone: basicInfoData.phone,
            name: basicInfoData.name,
            offDay: timingInfoData.offDay,
            pinCode: basicInfoData.pinCode,
            vanFacility: basicInfoData.vanFacility,
            sundayWorkingHours: timingInfoData.sundayWorkingHours,
            usualWorkingHours: timingInfoData.usualWorkingHours,
            ultraSoundWorkingHours: timingInfoData.ultraSoundWorkingHours
        };
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
        return this.tests.find( item => item.id === id);
    }

    private getCityById(id: number): Test{
        return this.cities.find( item => item.id === id);
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    private updateNumberOfTests(count :number) {

        this.numberOfTests = count;
    }
}
