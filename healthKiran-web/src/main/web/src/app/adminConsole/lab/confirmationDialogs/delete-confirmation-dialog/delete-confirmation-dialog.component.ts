import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {LabGenericService} from "../../LabGenericService";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.css']
})
export class DeleteConfirmationDialogComponent {

  id: number
  name: string;
  constructor(
      public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
    debugger
    this.id = data.id;
    this.name = data.name;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteLab(): void{
    LabGenericService.labService.deleteLabById( this.id.toString()).toPromise()
        .then(
            result => {
              console.log(result);
              LabGenericService.instance.updateLabsTable();
                this.dialogRef.close();
            },
            (e: HttpErrorResponse) => {
                this.snackBar.open('Could not delete the selected Lab !',null, {
                    duration: 2000,
                });
            }
        );
  }

}
