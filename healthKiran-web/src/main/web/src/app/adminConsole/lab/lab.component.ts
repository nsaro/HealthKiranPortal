import {Component, OnInit} from "@angular/core";
import {LabAddEditDialog} from "./lab.add.edit.dialog.component";
import {MatDialog, MatTableDataSource} from "@angular/material";
import {City} from "../../../generated/restClient";
import {HttpErrorResponse} from "@angular/common/http";
import {LabGenericService} from "./LabGenericService";

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
        debugger
        this.getAllLabs();
    }
    openDialog(): void {
        const dialogRef = this.dialog.open(LabAddEditDialog, {
            width: '850px',
            data: {
            },
            hasBackdrop: true
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }
    edit(row?: City) {
        //this.openDialog(row.id.toString(), row.name);
        console.log(row.name);
    }
    delete(row?: City) {
        LabGenericService.labService.deleteLabById(row.id.toString()).toPromise()
            .then(
                result => {
                    console.log(result);
                    LabGenericService.instance.updateLabsTable();
                },
                (e: HttpErrorResponse) => {
                    console.log('HttpErrorResponse :: ' + e.message);
                }
            );
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
