import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {Booking, BookingInformation} from "../../../generated/restClient";
import {Router} from "@angular/router";

@Component({
  selector: 'app-booking-confirmation-dialog',
  templateUrl: './booking-confirmation-dialog.component.html',
  styleUrls: ['./booking-confirmation-dialog.component.scss']
})
export class BookingConfirmationDialogComponent {

  booking: Booking
  constructor(
    public dialogRef: MatDialogRef<BookingConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Booking, private router: Router)
    {
      this.booking = data;
    }

  close(): void {
    this.dialogRef.close();
    this.router.navigate(['/']);
  }
}
