import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AddcommissionComponent } from './addcommission.component';
import { CommissionComponent } from './commission.component';

import { DataFilterPipe } from './datafilterpipe';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
//Routing
import {CommissionRoutingModule } from './commission-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  CommonModule,
  DataTableModule,
  HttpModule,
  FormsModule,
  ToasterModule,
  CommissionRoutingModule
  ],
  declarations: [
    CommissionComponent,
    AddcommissionComponent,
	DataFilterPipe
  ]
})
export class CommissionModule { }
