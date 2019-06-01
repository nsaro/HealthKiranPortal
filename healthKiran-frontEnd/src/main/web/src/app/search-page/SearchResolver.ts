import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Lab} from "../../generated/restClient";
import {Observable} from "rxjs";
import {GenericService} from "../services/GenericService";

@Injectable()
export class SearchResolver implements Resolve<Lab[]> {
  constructor() {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return GenericService.instance.labService.getAllLabsByCityAndTest(GenericService.instance.currentCityId, GenericService.instance.currentTestId);
  }
}
