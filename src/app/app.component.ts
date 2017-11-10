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
  currentStation: StationList;
  trainList: StationTrain[];

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

    if (this.currentStation) {
      this.componentService.getStationTrain(this.currentStation)
      .then((data) => {
        this.trainList = data;
      })
      .catch(() => this.notification.error( 'Error', 'Getting the Station train'));
    }
  }

  setStationTo(station:StationList) {
    this.currentStation = station;
    this.getStationTrain(station);
  }

  getStationTrain(station) {
    const pleaseWait = this.notification.warn( 'Loading', '');
    this.componentService.getStationTrain(station)
    .then((data) => {
      this.trainList = data;
      this.notification.remove(pleaseWait.id);
    })
    .catch(() => this.notification.error( 'Error', 'Getting the Station train'));
  }
}
