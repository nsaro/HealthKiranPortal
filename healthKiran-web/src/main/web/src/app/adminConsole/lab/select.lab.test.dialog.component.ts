import {Component, Inject, OnInit} from "@angular/core";
import {LabTest, Test} from "../../../generated/restClient";
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from "@angular/material";
import {LabGenericService} from "./LabGenericService";
import {TestGenericService} from "../test/TestGenericService";
import {HttpErrorResponse} from "@angular/common/http";

export interface LabTestTableData {
    labTestId: number;
    testObjId: number;
    priceObjId: number;
    labTestName: string;
    price: number;
    discountPercentage :number;
}

@Component({
    selector: 'select-test-price-dialog',
    templateUrl: 'select-test-price.dialog.html',
    styleUrls: ['./lab.component.css']
})

export class SelectLabTestDialog implements OnInit {

    labTestTableData = LabGenericService.instance.labTestTableData;
    selectedTestOptions: number[] = [];
    selectedLabTests: LabTest[];
    displayedColumns: string[] = ['index', 'labName', 'price', 'discount'];
    labSelectionDataSource = new MatTableDataSource<LabTestTableData>(this.labTestTableData);
    testList: Test[] = [];
    _labTest : any;

    constructor(
        public dialogRef: MatDialogRef<SelectLabTestDialog>,
        @Inject(MAT_DIALOG_DATA) public labTest: any, private labGenericService: LabGenericService) {

        labGenericService.updateLabTestTable.subscribe(() => {
            this.updateDataSourceTable();
        });
        this._labTest = labTest;
    }

    ngOnInit() {
        this.getAllTests();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onClickSubmit() {
        console.log(this.labTestTableData);
        LabGenericService.instance.labTestTableData = this.labTestTableData;
        LabGenericService.instance.updateTestCount(this.labTestTableData.length);
        this.dialogRef.close();
    }

    loadExistingTestsToTable(){
        let selectedLabTestTableData: LabTestTableData[] = [];

        if (this.labTestTableData.length > 0 && (this.labTestTableData[0].testObjId !== null &&
            this.labTestTableData[0].priceObjId !== null)) {

            this.labTestTableData.forEach(labTest => {
                selectedLabTestTableData.push({labTestId : labTest.labTestId,
                    testObjId : labTest.testObjId,
                    priceObjId : labTest.priceObjId,
                    labTestName : labTest.labTestName,
                    discountPercentage: labTest.discountPercentage,
                    price: labTest.price});
                let test: LabTest = this.testList.find(x => x.name === labTest.labTestName);
                if(test){
                    this.selectedTestOptions.push(test.id);
                }
            })
        } else {
            this.selectedLabTests.forEach(labTest => {
                selectedLabTestTableData.push({labTestId : labTest.id,
                    testObjId : labTest.test.id,
                    priceObjId : labTest.price.id,
                    labTestName : labTest.test.name,
                    discountPercentage: labTest.price.discountPercentage,
                    price: labTest.price.originalPrice});
                let test: LabTest = this.testList.find(x => x.name === labTest.test.name);
                if(test){
                    this.selectedTestOptions.push(test.id);
                }
            });
        }
        this.labTestTableData = selectedLabTestTableData;
        this.updateDataSourceTable();
    }
    onTestSelect(event)
    {
        if(event.isUserInput) {
            let labTestExist = this.labTestTableData.filter(x => x.labTestName == event.source.viewValue)[0];
            if(event.source.selected){
                if(labTestExist){
                } else {
                    this.labTestTableData.push({labTestId: null,  testObjId : event.source.value, priceObjId: null, labTestName: event.source.viewValue, price: null, discountPercentage: null});
                }
            } else {
                if(labTestExist){
                    let index = this.labTestTableData.findIndex(d => d.labTestName === labTestExist.labTestName); //find index in your array
                    this.labTestTableData.splice(index, 1);//remove element from array
                }
            }
            LabGenericService.instance.updateLabTestsTable();
        }
    }
    updateDataSourceTable(){
        this.labSelectionDataSource = new MatTableDataSource<LabTestTableData>(this.labTestTableData);
    }

    private getAllTests() {
        TestGenericService.testService.getAllTests().toPromise()
            .then(
                data => {
                    this.testList = data;
                    if(this._labTest.labTests){
                        this.selectedLabTests = this._labTest.labTests;
                        this.loadExistingTestsToTable();
                    }
                },
                (e: HttpErrorResponse) => {
                    console.log('HttpErrorResponse :: ' + e.message);
                }
            );

    }
}

