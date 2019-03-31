import {Component, Inject, OnInit} from "@angular/core";
import {Test, TestService} from "../../../generated/restClient";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormControl, FormGroup} from "@angular/forms";
import {TestGenericService} from "./TestGenericService";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'add-edit-test-dialog',
    templateUrl: 'test.add.edit.dialog.html',
    styleUrls: ['./test.component.css']
})
export class AddTestDialog implements OnInit {

    //test: Test;
    formData;
    headerText: string = 'Add';

    constructor(
        public dialogRef: MatDialogRef<AddTestDialog>,
        @Inject(MAT_DIALOG_DATA) public data: Test, private testService: TestService) {
        this.data = data;
        if (data.id !== null) {
            this.headerText = 'Edit';
        }
    }

    ngOnInit() {
        this.formData = new FormGroup({
            id: new FormControl(this.data.id),
            name: new FormControl(this.data.name),
            specialRequirements: new FormControl(this.data.specialRequirements)
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onClickSubmit(data) {
        debugger
        let test: Test;
        test = {id: data.id, name: data.name, specialRequirements: data.specialRequirements};
        this.testService.addTest(test).toPromise()
            .then(
                Test => {
                    TestGenericService.instance.updateTable();
                },
                (e: HttpErrorResponse) => {
                    console.log('HttpErrorResponse :: ' + e.message);
                }
            );
    }

}
