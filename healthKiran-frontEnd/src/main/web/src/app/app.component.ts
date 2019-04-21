import {Component, OnInit} from '@angular/core';
import {GenericService} from "./services/GenericService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  constructor(private genericService: GenericService){

  }
  ngOnInit() {
    console.log('GenericService '+ this.genericService +' loaded in memory');
  }
}
