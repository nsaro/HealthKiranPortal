import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {HttpErrorResponse} from "@angular/common/http";
import {CityGenericService} from "../../CityGenericService";

@Component({
  selector: 'app-delete-city-confirmation-dialog',
  templateUrl: './delete-city-confirmation-dialog.component.html',
  styleUrls: ['./delete-city-confirmation-dialog.component.css']
})
export class DeleteCityConfirmationDialogComponent {

  id: number
  name: string;
  constructor(
      public dialogRef: MatDialogRef<DeleteCityConfirmationDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar) {
    this.id = data.id;
    this.name = data.name;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  deleteCity(): void{
    CityGenericService.cityService.deleteCityById( this.id.toString()).toPromise()
        .then(
            result => {
              console.log(result);
              CityGenericService.instance.updateTable();
              this.dialogRef.close();
            },
            (e: HttpErrorResponse) => {
                this.snackBar.open('Could not delete the selected City !',null, {
                    duration: 2000,
                });
            }
        );
  }

}
