import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AdvertisingAgencyComponent } from './advertisingagency.component';

import { DataFilterPipe } from './datafilterpipe';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
//Routing
import { AdvertisingAgencyRoutingModule } from './advertisingagency-routing.module';

@NgModule({
  imports: [
  CommonModule,
  DataTableModule,
  HttpModule,
  FormsModule,
    AdvertisingAgencyRoutingModule
  ],
  declarations: [
    AdvertisingAgencyComponent,
	DataFilterPipe
  ]
})
export class AdvertisingAgencyModule { }
