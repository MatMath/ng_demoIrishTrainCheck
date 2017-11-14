// Core
import { Component, OnInit } from '@angular/core';
import { ComponentService } from './app.component.service';
import { NotificationsService } from 'angular2-notifications';

// Created
import { StationList, StationTrain } from '../classDefinition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  stationList: StationList[];
  currentStationList: StationList[] = [{
    StationAlias: "",
    StationCode: "ARKLW",
    StationDesc: "Arklow",
    StationId: undefined,
    StationLatitude: undefined,
    StationLongitude: undefined
  },
  {
    StationAlias: "",
    StationCode: "SKILL",
    StationDesc: "Shankill",
    StationId: undefined,
    StationLatitude: undefined,
    StationLongitude: undefined,
  }];
  currentStationTrainlist: Array<StationTrain[]>;

  public options = {
    position: ["top", "left"],
    timeOut: 0,
    lastOnBottom: true,
  };

  constructor(
    private componentService: ComponentService,
    private notification: NotificationsService,
  ){}

  ngOnInit(): void {
    this.componentService.getStationList()
    .then((data) => {
      this.stationList = data;
    })
    .catch(() => this.notification.error( 'Error', 'Getting the Station list'));

    if (this.currentStationList && this.currentStationList.length > 0) {
      this.getStationTrain();
    }
  }

  addRemoveStation(addRemove:StationList) {
    const initLength = this.currentStationTrainlist.length;
    console.log('Pop-in-out:', addRemove, initLength);
    this.currentStationList = this.currentStationList.filter(item => item.StationCode !== addRemove.StationCode);
    if(this.currentStationList.length === initLength) { // Not found so add it.
      this.currentStationList.push(addRemove);
    }
    this.getStationTrain();
  }

  getStationTrain() {
    const pleaseWait = this.notification.warn( 'Loading', '');
    this.currentStationTrainlist = [];
    Promise.all(this.currentStationList.map(station => this.componentService.getStationTrain(station)))
    .then((data) => {
      this.currentStationTrainlist = data;
      this.notification.remove(pleaseWait.id);
    })
    .catch(() => {
      this.notification.remove(pleaseWait.id);
      this.notification.error( 'Error', 'Getting the Station train');
    });
  }
}
