import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { DevicesService } from 'app/devices/devices.service';
import { Store } from '@ngrx/store';
import { SET_DEVICES } from 'app/reducers/devices.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  center: Observable<{}>;
  devices: any;
  user: Observable<firebase.User>;
  isLoggedIn: boolean;
  lat = 45.554526;
  lng = 18.686759;
  listExpanded = true;

  constructor(private afAuth: AngularFireAuth, private router: Router,
    private devicesService: DevicesService, private store: Store<string>) {

    this.center = this.store.select('app');
    this.store.select('devices').subscribe(devices => this.devices = devices);
    this.user = this.afAuth.authState;
    this.afAuth.authState.subscribe(auth => {
      if (auth == null) {
        console.log('Not Logged in.');
        this.router.navigate(['login']);
        this.isLoggedIn = false;
      } else {
        console.log('Successfully Logged in.');
        auth.getToken().then(token => {
          console.log(token);
          this.devicesService.getDevices().subscribe(data => {
            const devices = data.sort((a, b) => a.name > b.name);
            this.store.dispatch({ type: SET_DEVICES, payload: devices });
          });
        });
        this.isLoggedIn = true;
        this.router.navigate(['']);

      }
    });
  }


  logout() {
    this.afAuth.auth.signOut();
  }

  isRouteActive(route: string) {
    return this.router.isActive(route, true);
  }
}
