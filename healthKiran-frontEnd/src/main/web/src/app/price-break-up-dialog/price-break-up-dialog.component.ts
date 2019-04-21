import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

export interface TableData {
  testName	: string;
  mrp: string;
  discount: string;
  total: string;
}
@Component({
  selector: 'app-price-break-up-dialog',
  templateUrl: './price-break-up-dialog.component.html',
  styleUrls: ['./price-break-up-dialog.component.scss']
})
export class PriceBreakUpDialogComponent {

  tableData: TableData[] = [];
  ELEMENT_DATA: TableData[] = [
    {testName: "Kidney Function Test (KFT/RFT)", mrp: ' 780', discount: '0.00 %', total: '780'},
    {testName: "CBC Complete Blood Count", mrp: '350', discount: '0.00 %', total: '350'}
  ];

  displayedColumns: string[] = ['Test Name', 'MRP', 'Discount %', 'Payable'];
  dataSource = this.ELEMENT_DATA;
  constructor(
    public dialogRef: MatDialogRef<PriceBreakUpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public _tableData: TableData[]) {
    this.tableData = _tableData;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
