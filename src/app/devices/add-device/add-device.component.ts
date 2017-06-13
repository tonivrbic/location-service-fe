import { DevicesService } from '../devices.service';
import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.scss']
})
export class AddDeviceComponent implements OnInit {
  device = {
    name: '',
    icon: ''
  };
  buttonDisabled = false;
  constructor(private devicesSerice: DevicesService, private snackBar: MdSnackBar) { }

  ngOnInit() {
  }

  addDevice() {
    this.buttonDisabled = true;
    this.devicesSerice.addDevice(this.device).subscribe(data => {
      this.snackBar.open(`Device ${data.name} created`, '', {
        duration: 4000,
      });
      this.buttonDisabled = false;
      this.device.name = '';
      this.device.icon = '';
    }, err => {
      this.snackBar.open(`Error: ${err}`, '', {
        duration: 5000,
      });
      this.buttonDisabled = false;

    });
  }
}
