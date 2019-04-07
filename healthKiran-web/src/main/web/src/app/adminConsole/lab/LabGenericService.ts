import {EventEmitter, Injectable, Output} from "@angular/core";
import {LabTestTableData} from "./select.lab.test.dialog.component";
import {LabService} from "../../../generated/restClient";

@Injectable({
    providedIn: 'root'
})
export class LabGenericService {

    static instance: LabGenericService;
    static labService: LabService;
    labTestTableData: LabTestTableData[] = [];
    testSelectedCounter = 0;
    @Output() updateTestCountOnBadge = new EventEmitter();
    @Output() updateLabTestTable = new EventEmitter();
    @Output() updateLabTable = new EventEmitter();

    constructor(private labService: LabService) {
        LabGenericService.instance = this;
        LabGenericService.labService = labService;
    }

    updateLabTestsTable(){
        this.updateLabTestTable.emit();
    }

    updateLabsTable(){
        this.updateLabTable.emit();
    }
    updateTestCount(count: number){
        this.testSelectedCounter = count;
        this.updateTestCountOnBadge.emit(this.testSelectedCounter);
    }

}
