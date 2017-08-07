import { SET_POSITION } from '../reducers/app.reducer';
import { AngularFireAuth } from 'angularfire2/auth';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { HistoryService } from 'app/history/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  center: Observable<any>;
  historyData = [];

  constructor(private store: Store<any>, private route: ActivatedRoute, private historyService: HistoryService,
    private afAuth: AngularFireAuth) {
    this.center = this.store.select('app');
  }

  ngOnInit() {
    this.route.params.subscribe(param => {
      const id = param['id'];
      const from = new Date(Date.now() - 1000 * 60 * 60 * 30);
      const to = new Date(Date.now() + 1000 * 60 * 60 * 30);

      this.afAuth.authState.subscribe(auth => {
        if (auth !== null) {
          auth.getToken().then(token => {
            this.historyService.getHistoryForDevice(id, from, to).subscribe((hist: any[]) => {
              console.log(hist);
              this.historyData = hist;

              this.store.dispatch({
                type: SET_POSITION, payload: {
                  longitude: hist.map(x => x.longitude).reduce((a, b) => a + b) / hist.length,
                  latitude: hist.map(x => x.latitude).reduce((a, b) => a + b) / hist.length,
                  zoom: 15
                }
              });
            });
          });
        }
      });
    });
  }
}
