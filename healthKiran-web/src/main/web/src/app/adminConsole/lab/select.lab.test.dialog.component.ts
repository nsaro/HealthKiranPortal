import {Component, Inject, OnInit} from "@angular/core";
import {LabTest, Test} from "../../../generated/restClient";
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from "@angular/material";
import {LabGenericService} from "./LabGenericService";
import {TestGenericService} from "../test/TestGenericService";
import {HttpErrorResponse} from "@angular/common/http";

export interface LabTestTableData {
    labId: number;
    labTestName: string;
    price: string;
    discountPercentage :string;
}

@Component({
    selector: 'select-test-price-dialog',
    templateUrl: 'select-test-price.dialog.html',
    styleUrls: ['./lab.component.css']
})

export class SelectLabTestDialog implements OnInit {

    labTestTableData = LabGenericService.instance.labTestTableData;

    data: LabTest;
    displayedColumns: string[] = ['index', 'labName', 'price', 'discount'];
    labSelectionDataSource = new MatTableDataSource<LabTestTableData>(this.labTestTableData);
    testList: Test[] = [];

    constructor(
        public dialogRef: MatDialogRef<SelectLabTestDialog>,
        @Inject(MAT_DIALOG_DATA) public labTest: LabTest, private labGenericService: LabGenericService) {
        this.data = labTest;
        labGenericService.updateLabTestTable.subscribe(() => {
            this.updateDataSourceTable();
        });
    }

    ngOnInit() {
        this.getAllTests();
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onClickSubmit() {
        console.log(this.labTestTableData);
    }

    onTestSelect(event)
    {
        if(event.isUserInput) {
            let labTestExist = this.labTestTableData.filter(x => x.labTestName == event.source.viewValue)[0];
            if(event.source.selected){
                if(labTestExist){
                } else {
                    this.labTestTableData.push({labId: event.source.value, labTestName: event.source.viewValue, price: "", discountPercentage: ""});
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
                },
                (e: HttpErrorResponse) => {
                    console.log('HttpErrorResponse :: ' + e.message);
                }
            );

    }
}

