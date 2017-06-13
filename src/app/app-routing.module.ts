import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from 'app/login/login.component';
import { AddDeviceComponent } from 'app/devices/add-device/add-device.component';
import { EditDeviceComponent } from 'app/devices/edit-device/edit-device.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'add',
    component: AddDeviceComponent
  },
  {
    path: 'edit/:id',
    component: EditDeviceComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
