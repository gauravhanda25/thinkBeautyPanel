import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AddenquiriesComponent } from './addenquiries.component';
import { EnquiriesComponent } from './enquiries.component';

import { DataFilterPipe } from './datafilterpipe';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
//Routing
import {EnquiriesRoutingModule } from './enquiries-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  CommonModule,
  DataTableModule,
  HttpModule,
  FormsModule,
  ToasterModule,
  EnquiriesRoutingModule
  ],
  declarations: [
    EnquiriesComponent,
    AddenquiriesComponent,
	  DataFilterPipe
  ]
})
export class EnquiriesModule { }
