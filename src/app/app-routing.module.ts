import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from 'app/login/login.component';
import { AddDeviceComponent } from 'app/devices/add-device/add-device.component';
import { EditDeviceComponent } from 'app/devices/edit-device/edit-device.component';
import { MainComponent } from 'app/main/main.component';
import { HistoryComponent } from 'app/history/history.component';
import { AboutComponent } from 'app/about/about.component';

const routes: Routes = [
  {
    component: MainComponent,
    path: '',
    children: [{
      path: 'add',
      component: AddDeviceComponent
    },
    {
      path: 'edit/:id',
      component: EditDeviceComponent
    }]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'history/:id',
    component: HistoryComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
