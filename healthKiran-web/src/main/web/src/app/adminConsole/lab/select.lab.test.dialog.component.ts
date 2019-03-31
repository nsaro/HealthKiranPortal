import {Component, Inject, OnInit} from "@angular/core";
import {LabTest, Test} from "../../../generated/restClient";
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource} from "@angular/material";
import {LabGenericService} from "./LabGenericService";

export interface LabTestTableData {
    id: number;
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

    testList: Test[] = [
        {id: 1, name: 'Liver Function Test', specialRequirements: 'No requirements'},
        {id: 2, name: 'Kidney Function Test', specialRequirements: 'No requirements'},
        {id: 3, name: 'Brain Function Test', specialRequirements: 'No requirements'},
        {id: 4, name: 'Heart Test', specialRequirements: 'No requirements'}
    ];

    constructor(
        public dialogRef: MatDialogRef<SelectLabTestDialog>,
        @Inject(MAT_DIALOG_DATA) public labTest: LabTest, private labGenericService: LabGenericService) {
        this.data = labTest;
        labGenericService.updateLabTestTable.subscribe(() => {
            this.updateDataSourceTable();
        });
    }

    ngOnInit() {

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
            console.log(event.source.value, event.source.selected);
            let labTestExist = this.labTestTableData.filter(x => x.labTestName == event.source.value)[0];
            if(event.source.selected){
                if(labTestExist){
                    console.log('dont do anything');
                } else {
                    this.labTestTableData.push({id: 0, labTestName: event.source.value, price: "", discountPercentage: ""});
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
}

