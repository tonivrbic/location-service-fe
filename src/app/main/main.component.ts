import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  center: Observable<any>;
  devices: any;
  lat = 45.554526;
  lng = 18.686759;
  listExpanded = true;

  constructor(private store: Store<string>) {
    this.center = this.store.select('app');

    this.store.select('devices').subscribe(devices => this.devices = devices);

  }
}
