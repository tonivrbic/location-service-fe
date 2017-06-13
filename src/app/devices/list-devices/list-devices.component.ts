import { DevicesService } from '../devices.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { SET_POSITION } from 'app/reducers/app.reducer';

@Component({
  selector: 'app-list-devices',
  templateUrl: './list-devices.component.html',
  styleUrls: ['./list-devices.component.scss']
})
export class ListDevicesComponent implements OnInit {
  @Input() devices;
  activeItem = 0;
  constructor(private devicesService: DevicesService, private snackBar: MdSnackBar,
    private store: Store<string>) { }

  ngOnInit() {
  }

  deleteDevice(id) {
    this.devicesService.deleteDevice(id).subscribe(data => {
      this.snackBar.open(`Device deleted`, '', {
        duration: 4000,
      });
    }, err => {
      this.snackBar.open(`Error: ${err}`, '', {
        duration: 5000,
      });
    });
  }

  selectDevice(device) {
    this.store.dispatch({
      type: SET_POSITION, payload: {
        latitude: device.latitude,
        longitude: device.longitude,
        zoom: 15
      }
    });
  }

  setActiveItem(event: Event, id) {
    this.activeItem = id;
    event.stopPropagation();
  }
}
