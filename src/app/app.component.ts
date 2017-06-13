import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { DevicesService } from 'app/devices/devices.service';
import { Store } from '@ngrx/store';

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

  constructor(private afAuth: AngularFireAuth, private router: Router,
    private devicesService: DevicesService, private store: Store<string>) {
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
          this.getDevices();
        });
        this.isLoggedIn = true;
        this.router.navigate(['']);

      }
    });

    this.center = this.store.select('app');
  }


  logout() {
    this.afAuth.auth.signOut();
  }

  isRouteActive(route: string) {
    return this.router.isActive(route, true);
  }

  getDevices() {
    this.devicesService.getDevices().subscribe(data => {
      this.devices = data;
    });
  }
}
