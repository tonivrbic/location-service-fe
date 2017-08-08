import { Http, Headers, Response } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DevicesService {
  headers: Headers;

  constructor(private http: Http, private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(auth => {
      if (auth !== null) {
        auth.getToken().then(token => {
          this.headers = new Headers({ 'Authorization': `Bearer ${token}` });
        });
      }
    });
  }

  getDevices(): Observable<any> {
    return this.http.get('http://localhost:52591/api/devices', { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  getDevice(id): Observable<any> {
    return this.http.get('http://localhost:52591/api/devices/' + id, { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteDevice(id): Observable<any> {
    return this.http.delete('http://localhost:52591/api/devices/' + id, { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  addDevice(data): Observable<any> {
    return this.http.post('http://localhost:52591/api/devices', data, { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  saveDevice(id, data): Observable<any> {
    return this.http.put('http://localhost:52591/api/devices/' + id, data, { headers: this.headers })
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
