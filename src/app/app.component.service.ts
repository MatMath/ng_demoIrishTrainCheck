const baseURL:string = 'http://localhost:3002'
const allStationApi:string = 'getallstations';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { StationList, StationTrain } from '../classDefinition';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ComponentService {
  private allStation = `${baseURL}/${allStationApi}`;
  private stationtraffic = `${baseURL}/stationtraffic`;
  constructor(private http: HttpClient) { }

  getStationList(): Promise<Array<StationList>> {
    return this.http
      .get(this.allStation)
      .toPromise()
      .then((response) => {
        return response;
      })
      .catch(this.handleError);
  }

  getStationTrain(station): Promise<Array<StationTrain>> {
    let Params = new HttpParams();
    Params = Params.append('StationCode', station.StationCode);
    Params = Params.append('NumMins', '20');
    return this.http
      .get(this.stationtraffic, { params: Params })
      .toPromise()
      .then((response) => {
        if (Array.isArray(response)) {
          return response;
        }
        return [response];
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
};
