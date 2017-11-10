// Core
import { Component, OnInit } from '@angular/core';
import { ComponentService } from './app.component.service';

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

  constructor(
    private componentService: ComponentService,
  ){}

  ngOnInit(): void {
    this.componentService.getStationList()
    .then((data) => {
      this.stationList = data;
    })
    .catch(console.log);

    if (this.currentStation) {
      this.componentService.getStationTrain()
      .then((data) => {
        this.trainList = data;
      })
      .catch(console.log);
    }
  }

  setStationTo(station:StationList) {
    console.log('Selecting:', station);
    this.currentStation = station;
    this.getStationTrain(station);
  }

  getStationTrain(station) {
    console.log('Get the station', station);
  }
}
