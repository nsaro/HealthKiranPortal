import {EventEmitter, Injectable, Output} from "@angular/core";
import {CityService} from "../../../generated/restClient";

@Injectable({
    providedIn: 'root'
})
export class CityGenericService {

    static instance: CityGenericService;

    static cityService: CityService;
    constructor(private cityService: CityService) {
        CityGenericService.instance = this;
        CityGenericService.cityService = cityService;
    }
    @Output() updateCitiesTable = new EventEmitter();

    updateTable(){
        this.updateCitiesTable.emit();
    }
}
