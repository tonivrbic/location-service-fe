import { DevicesService } from '../devices.service';
import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';
import { SET_DEVICES } from 'app/reducers/devices.reducer';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit {
  device = {
    name: '',
    icon: 'boy'
  };
  buttonDisabled = false;
  constructor(private devicesService: DevicesService, private snackBar: MdSnackBar, private store: Store<any>) { }

  ngOnInit() {
  }

  addDevice() {
    this.buttonDisabled = true;
    this.devicesService.addDevice(this.device).subscribe(data => {
      this.snackBar.open(`Device ${data.name} created`, '', {
        duration: 4000,
      });
      this.buttonDisabled = false;
      this.device.name = '';
      this.device.icon = '';
      this.devicesService.getDevices().subscribe(data => {
        const devices = data.sort((a, b) => a.name > b.name);
        this.store.dispatch({ type: SET_DEVICES, payload: devices });
      });
    }, err => {
      this.snackBar.open(`Error: ${err}`, '', {
        duration: 5000,
      });
      this.buttonDisabled = false;

    });
  }
}
