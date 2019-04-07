import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {HttpErrorResponse} from "@angular/common/http";
import {TestGenericService} from "../../TestGenericService";

@Component({
  selector: 'app-delete-test-confirmation-dialog',
  templateUrl: './delete-test-confirmation-dialog.component.html',
  styleUrls: ['./delete-test-confirmation-dialog.component.css']
})
export class DeleteTestConfirmationDialogComponent {

  id: number
  name: string;
  constructor(
      public dialogRef: MatDialogRef<DeleteTestConfirmationDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
    this.id = data.id;
    this.name = data.name;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteTest(): void{
    TestGenericService.testService.deleteTestById( this.id.toString()).toPromise()
        .then(result => {
              TestGenericService.instance.updateTable();
              this.dialogRef.close();
            },
            (e: HttpErrorResponse) => {
              this.snackBar.open('Could not delete the selected Test !',null, {
                  duration: 2000,
              });
            }
        );
  }

}
