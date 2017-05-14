import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: Observable<firebase.User>;
  isLoggedIn: boolean;
  lat = 51.678418;
  lng = 7.809007;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    this.user = this.afAuth.authState;
    this.afAuth.authState.subscribe(auth => {
      if (auth == null) {
        console.log('Not Logged in.');
        this.router.navigate(['login']);
        this.isLoggedIn = false;
      } else {
        console.log('Successfully Logged in.');
        this.isLoggedIn = true;
        // UPDATE: I forgot this at first. Without it when a user is logged in and goes directly to /login
        // the user did not get redirected to the home page.
        this.router.navigate(['']);
      }
    });
  }


  logout() {
    this.afAuth.auth.signOut();
  }
}
