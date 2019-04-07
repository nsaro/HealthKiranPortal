import {Component, OnInit} from '@angular/core';
import {Test, TestService} from "../../../generated/restClient";
import {MatDialog, MatTableDataSource} from "@angular/material";
import {HttpErrorResponse} from "@angular/common/http";
import {TestGenericService} from "./TestGenericService";
import {AddTestDialog} from "./add-test-dialog.component";
import {DeleteCityConfirmationDialogComponent} from "../cities/confirmationDialogs/delete-city-confirmation-dialog/delete-city-confirmation-dialog.component";
import {DeleteTestConfirmationDialogComponent} from "./confirmationDialogs/delete-test-confirmation-dialog/delete-test-confirmation-dialog.component";

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

    tests: Test[] = [{id: 0, name: "", specialRequirements: ""}];
    displayedColumns: string[] = ['index', 'name', 'specialRequirements', 'edit', 'delete'];
    dataSource = new MatTableDataSource<Test>(this.tests);

    constructor(public dialog: MatDialog) {
        TestGenericService.instance.updateTestsTable.subscribe(() => {
            this.getAllTests();
        });
    }

    ngOnInit() {
        this.getAllTests();

    }

    openDialog(id: string, name: string, specialRequirements: string): void {
        const dialogRef = this.dialog.open(AddTestDialog, {
            width: '350px',
            data: {id: id, name: name, specialRequirements: specialRequirements},
            hasBackdrop: true
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed : ' + result);
        });
    }
    openDeleteTestDialog(testId, testName): void {
        const dialogRef = this.dialog.open(DeleteTestConfirmationDialogComponent, {
            width: '550px',
            data: { id: testId, name: testName },
            hasBackdrop: true
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
        });
    }

    private getAllTests() {
        TestGenericService.testService.getAllTests().toPromise()
            .then(
                data => {
                    console.log(data);
                    this.tests = data;
                    this.dataSource = new MatTableDataSource<Test>(this.tests);
                },
                (e: HttpErrorResponse) => {
                    console.log('HttpErrorResponse :: ' + e.message);
                }
            );

    }

    edit(row?: Test) {
        this.openDialog(row.id.toString(), row.name, row.specialRequirements);
    }

    delete(row?: Test) {
        this.openDeleteTestDialog(row.id, row.name);
    }
}

