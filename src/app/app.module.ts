import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AgmCoreModule } from '@agm/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { LoginComponent } from 'app/login/login.component';
import { AppRoutingModule } from 'app/app-routing.module';
import { environment } from 'environments/environment';
import { DevicesService } from 'app/devices/devices.service';
import { AddDeviceComponent } from './devices/add-device/add-device.component';
import { ListDevicesComponent } from './devices/list-devices/list-devices.component';
import { EditDeviceComponent } from './devices/edit-device/edit-device.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from 'app/reducers/app.reducer';
import { devicesReducer } from 'app/reducers/devices.reducer';
import { MainComponent } from './main/main.component';
import { HistoryComponent } from './history/history.component';
import { HistoryService } from 'app/history/history.service';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, AddDeviceComponent, ListDevicesComponent, EditDeviceComponent, MainComponent, HistoryComponent, DeleteDialogComponent
  ],
  entryComponents: [DeleteDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCKb-hVu7N2XQHpq2dR-mWOTaqSxfOjP7U'
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    StoreModule.provideStore({ 'app': appReducer, 'devices': devicesReducer })
  ],
  providers: [DevicesService, HistoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
