import {Component, OnInit, Inject} from '@angular/core';
import {City, CityService} from "../../../generated/restClient";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CityGenericService} from "./CityGenericService";

@Component({
    selector: 'app-cities',
    templateUrl: './city.component.html',
    styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

    cities: City[] = [{id: 0, name: ""}];
    displayedColumns: string[] = ['index', 'name', 'edit', 'delete'];
    dataSource = new MatTableDataSource<City>(this.cities);

    constructor(public dialog: MatDialog,) {
        CityGenericService.instance.updateCitiesTable.subscribe(() => {
            this.getAllCities();
        });
    }

    ngOnInit() {
        this.getAllCities();

    }

    openDialog(id:string, name: string): void {
        const dialogRef = this.dialog.open(AddCityDialog, {
            width: '350px',
            data: {id: id, name: name},
            hasBackdrop: true
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed : '+ result);
        });
    }

    private getAllCities() {
        CityGenericService.cityService.getAllCities().toPromise()
            .then(
                data => {
                    console.log(data);
                    //this.dataSource = data;
                    this.cities = data;
                    this.dataSource = new MatTableDataSource<City>(this.cities);
                },
                (e: HttpErrorResponse) => {
                    console.log('HttpErrorResponse :: ' + e.message);
                }
            );

    }

    edit(row?: City) {
        this.openDialog(row.id.toString(), row.name);
    }
    delete(row?: City) {
        CityGenericService.cityService.deleteCityById(row.id.toString()).toPromise()
            .then(
                result => {
                    console.log(result);
                    CityGenericService.instance.updateTable();
                },
                (e: HttpErrorResponse) => {
                    console.log('HttpErrorResponse :: ' + e.message);
                }
            );
    }
}

@Component({
    selector: 'add-edit-city-dialog',
    templateUrl: 'city.add.edit.dialog.html',
    styleUrls: ['./city.component.css']
})
export class AddCityDialog implements OnInit{

    city: City;
    formData;
    headerText: string = 'Add';

    constructor(
        public dialogRef: MatDialogRef<AddCityDialog>,
        @Inject(MAT_DIALOG_DATA) public data: City, private cityService: CityService) {
        this.data = data;
        if(data.id !== null){
            this.headerText = 'Edit';
        }
    }

    ngOnInit() {
        this.formData = new FormGroup({
            id: new FormControl(this.data.id),
            name: new FormControl(this.data.name),
        });
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    onClickSubmit(data) {
        console.log(data);
        this.city = {id: data.id, name: data.name};

        CityGenericService.cityService.addCity(this.city).toPromise()
            .then(
                City => {
                    console.log(City);
                    CityGenericService.instance.updateTable();
                },
                (e: HttpErrorResponse) => {
                    console.log('HttpErrorResponse :: ' + e.message);
                }
            );
    }
}
