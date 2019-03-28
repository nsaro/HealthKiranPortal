import {EventEmitter, Injectable, Output} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CityGenericService {

    static instance: CityGenericService;

    constructor() {
        CityGenericService.instance = this;
    }
    @Output() updateCitiesTable = new EventEmitter();

    updateTable(){
        this.updateCitiesTable.emit();
    }
}
