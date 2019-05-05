import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

export interface TableData {
  testName	: string;
  mrp: number;
  discount: number;
  total: number;
  specialRequirement: string;
}
@Component({
  selector: 'app-price-break-up-dialog',
  templateUrl: './price-break-up-dialog.component.html',
  styleUrls: ['./price-break-up-dialog.component.scss']
})
export class PriceBreakUpDialogComponent {

  tableData: TableData[] = [];
  displayedColumns: string[] = ['Test Name', 'MRP', 'Discount %', 'Payable'];
  dataSource = this.tableData;
  constructor(
    public dialogRef: MatDialogRef<PriceBreakUpDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    data.testTableData.forEach(testData => {
      this.tableData.push(testData);
    });
  }

}
