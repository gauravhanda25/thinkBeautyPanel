import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {  AdvertisingAgencyComponent } from './advertisingagency.component';

const routes: Routes = [
    {
      path: '',
      component:  AdvertisingAgencyComponent,
      data: {
        title: 'AdvertisingAgency'
      }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  AdvertisingAgencyRoutingModule {}
