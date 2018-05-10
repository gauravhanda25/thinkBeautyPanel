import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AddfixedchargeComponent } from './addfixedcharge.component';
import { FixedchargeComponent } from './fixedcharge.component';

import { DataFilterPipe } from './datafilterpipe';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
//Routing
import {FixedchargeRoutingModule } from './fixedcharge-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  CommonModule,
  DataTableModule,
  HttpModule,
  FormsModule,
  ToasterModule,
  FixedchargeRoutingModule
  ],
  declarations: [
    FixedchargeComponent,
    AddfixedchargeComponent,
	DataFilterPipe
  ]
})
export class FixedchargeModule { }
