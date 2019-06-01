import {BookingInformationService, CityService, LabService, TestService} from "../../generated/restClient";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  static instance: GenericService;
  currentCityId: number;
  currentTestId: number[] = [];
  cityService: CityService;
  testService: TestService;
  labService: LabService;
  bookingInformationService: BookingInformationService;
  constructor(private _cityService: CityService,
              private _testService: TestService,
              private _labService: LabService,
              private _bookingInformationService: BookingInformationService
            ) {
    GenericService.instance = this;
    this.cityService = _cityService;
    this.testService = _testService;
    this.labService = _labService;
    this.bookingInformationService = _bookingInformationService;
  }
}
