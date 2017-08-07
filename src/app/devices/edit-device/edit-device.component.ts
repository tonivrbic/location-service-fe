import { Store } from '@ngrx/store';
import { DevicesService } from '../devices.service';
import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SET_DEVICES } from 'app/reducers/devices.reducer';

@Component({
  selector: 'app-edit-device',
  templateUrl: './edit-device.component.html',
  styleUrls: ['./edit-device.component.scss']
})
export class EditDeviceComponent implements OnInit {
  device = {
    address: '',
    icon: '',
    id: '',
    latitude: '',
    longitude: '',
    name: '',
    userId: ''
  };
  id;
  buttonDisabled = false;
  constructor(private devicesService: DevicesService, private snackBar: MdSnackBar,
    private route: ActivatedRoute, private router: Router, private store: Store<any>) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.devicesService.getDevice(this.id).subscribe(device => {
        this.device = device;
      });
    });
  }

  saveDevice() {
    this.buttonDisabled = true;
    this.devicesService.saveDevice(this.id, this.device).subscribe(data => {
      this.snackBar.open(`Device ${this.device.name} updated`, '', {
        duration: 4000,
      });
      this.buttonDisabled = false;
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
