import {Component} from '@angular/core';
import {CityGenericService} from "./adminConsole/cities/CityGenericService";
import {TestGenericService} from "./adminConsole/test/TestGenericService";
import {LabGenericService} from "./adminConsole/lab/LabGenericService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private cityGenericService: CityGenericService,
              private testGenericService:TestGenericService,
              private labGenericService: LabGenericService){
  }
  ngOnInit() {
    console.log('CityGenericService '+ this.cityGenericService +' loaded in memory');
    console.log('TestGenericService '+ this.testGenericService +' loaded in memory');
    console.log('LabGenericService '+ this.labGenericService +' loaded in memory');
  }
}
