import { Component, OnInit } from '@angular/core';
import { ComponentService } from './app.component.service';

import { StationList } from '../classDefinition';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  stationList: StationList[];
  constructor(
    private componentService: ComponentService,
  ){}

  ngOnInit(): void {
    this.componentService.getStationList()
    .then((data) => {
      console.log('RECEIVED:', data)
      this.stationList = data;
    })
    .catch(console.log);
  }
}
