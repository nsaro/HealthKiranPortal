import {EventEmitter, Injectable, Output} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TestGenericService {

    static instance: TestGenericService;

    constructor() {
        TestGenericService.instance = this;
    }

    @Output() updateTestsTable = new EventEmitter();

    updateTable() {
        this.updateTestsTable.emit();
    }
}
