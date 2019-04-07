import {Component, OnInit} from "@angular/core";
import {LabAddEditDialog} from "./lab.add.edit.dialog.component";
import {MatDialog, MatTableDataSource} from "@angular/material";
import {HttpErrorResponse} from "@angular/common/http";
import {LabGenericService} from "./LabGenericService";
import {DeleteConfirmationDialogComponent} from "./confirmationDialogs/delete-confirmation-dialog/delete-confirmation-dialog.component";

export interface LabTableData {
    id: number;
    name: string;
    address: string;
    city :string;
}

@Component({
    selector: 'app-lab',
    templateUrl: './lab.component.html',
    styleUrls: ['./lab.component.css']
})
export class LabComponent implements OnInit {

    labs: LabTableData[] = [{id: 0, name: "", address:"", city:""}];
    displayedColumns: string[] = ['index', 'name', 'address','city','edit', 'delete'];
    dataSource = new MatTableDataSource<LabTableData>(this.labs);
    constructor(public dialog: MatDialog) {
        LabGenericService.instance.updateLabTable.subscribe(() => {
            this.getAllLabs();

        });
    }
    ngOnInit() {
        this.getAllLabs();
    }

    openDeleteLabDialog(labId, labName): void {
        const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
            width: '550px',
            data: { id: labId, name: labName },
            hasBackdrop: true
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    openDialog(lab): void {
        const dialogRef = this.dialog.open(LabAddEditDialog, {
            width: '850px',
            data: {lab : lab},
            hasBackdrop: true
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }
    edit(row?: LabTableData) {
        console.log(row.name);
        LabGenericService.labService.getLabById(row.id.toString()).toPromise()
            .then(
                lab => {
                    console.log(lab);
                    this.openDialog(lab);
                },
                (e: HttpErrorResponse) => {
                    console.log('HttpErrorResponse :: ' + e.message);
                }
            );
    }
    delete(row?: LabTableData) {
        this.openDeleteLabDialog(row.id, row.name);
    }
    private getAllLabs() {
        LabGenericService.labService.getAllLabs().toPromise()
            .then(
                labs => {
                    this.labs = this.convertAllLabsToLabTableData(labs);
                    this.dataSource = new MatTableDataSource<LabTableData>(this.labs);
                },
                (e: HttpErrorResponse) => {
                    console.log('HttpErrorResponse :: ' + e.message);
                }
            );
    }
    private convertAllLabsToLabTableData(labs): LabTableData[]{
        let labTableDataRows: LabTableData[] = [];
        labs.forEach(function (value) {
            let labTableData:LabTableData = { id: value.id, name: value.name,
            city: value.city.name, address: value.address};
            labTableDataRows.push(labTableData);
        });
        return labTableDataRows;
    }
}
