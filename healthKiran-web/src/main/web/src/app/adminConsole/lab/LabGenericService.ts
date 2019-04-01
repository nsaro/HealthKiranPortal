import {EventEmitter, Injectable, Output} from "@angular/core";
import {LabTestTableData} from "./select.lab.test.dialog.component";
import {LabService} from "../../../generated/restClient";

@Injectable({
    providedIn: 'root'
})
export class LabGenericService {

    static instance: LabGenericService;
    static labService: LabService;
    labTestTableData: LabTestTableData[] = [
    ];
    constructor(private labService: LabService) {
        LabGenericService.instance = this;
        LabGenericService.labService = labService;
    }
    @Output() updateLabTestTable = new EventEmitter();

    updateLabTestsTable(){
        this.updateLabTestTable.emit();
    }

}
