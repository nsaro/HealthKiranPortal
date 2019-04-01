import {EventEmitter, Injectable, Output} from "@angular/core";
import {TestService} from "../../../generated/restClient";

@Injectable({
    providedIn: 'root'
})
export class TestGenericService {

    static instance: TestGenericService;
    static testService: TestService;
    constructor(private testService: TestService) {
        TestGenericService.instance = this;
        TestGenericService.testService = testService;
    }

    @Output() updateTestsTable = new EventEmitter();

    updateTable() {
        this.updateTestsTable.emit();
    }
}
