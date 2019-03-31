import {EventEmitter, Injectable, Output} from "@angular/core";
import {LabTestTableData} from "./select.lab.test.dialog.component";

@Injectable({
    providedIn: 'root'
})
export class LabGenericService {

    static instance: LabGenericService;

    labTestTableData: LabTestTableData[] = [
    ];
    constructor() {
        LabGenericService.instance = this;
    }
    @Output() updateLabTestTable = new EventEmitter();

    updateLabTestsTable(){
        this.updateLabTestTable.emit();
    }

}
