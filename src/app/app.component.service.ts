const baseURL:string = 'http://localhost:3002'
const allStationApi:string = 'getallstations';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { StationList } from '../classDefinition';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ComponentService {
  private allStation = `${baseURL}/${allStationApi}`;
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

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
};