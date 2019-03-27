import {Component, OnInit} from '@angular/core';
import {City, CityService} from "../../../generated/restClient";
import {FormControl, FormGroup} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
    selector: 'app-cities',
    templateUrl: './cities.component.html',
    styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

    city: City;
    formData;
    selection = new SelectionModel<City>(true, []);
    cities: City[] = [{id: 0, name: ""}];
    displayedColumns: string[] = ['id', 'name', 'select'];
    dataSource = new MatTableDataSource<City>(this.cities);
    constructor(private cityService: CityService) {
        this.cityService = cityService;
    }

    ngOnInit() {
        this.formData = new FormGroup({
            name: new FormControl(),
        });
        this.getAllCities();
    }

    onClickSubmit(data) {
        console.log(data);
        this.city = {id: null, name: data.name};

        this.cityService.addCity(this.city).toPromise()
            .then(
                City => {
                    console.log(City);
                },
                (e: HttpErrorResponse) => {
                    console.log('HttpErrorResponse :: ' + e.message);
                }
            );
    }

    private getAllCities() {
        this.cityService.getAllCities().toPromise()
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

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: City): string {
        if (!row) {
            return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }

}
