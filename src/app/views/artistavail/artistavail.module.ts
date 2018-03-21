import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ArtistavailComponent } from './artistavail.component';
import { AddartistavailComponent } from './addartistavail.component';
import { AddartistvacationComponent } from './addartistvacation.component';
import { AddartistgccComponent } from './addartistgcc.component';
import { ArtistvacationComponent } from './artistvacation.component';
import { ArtistgccComponent } from './artistgcc.component';

import { DataFilterPipe } from './datafilterpipe';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
import * as moment from 'moment';
import { ModalModule } from "ngx-bootstrap";

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

//Routing
import { ArtistavailRoutingModule } from './artistavail-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';


// Datepicker
import { BsDatepickerModule } from 'ngx-bootstrap';


// Timepicker
import { TimepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
  CommonModule,
  DataTableModule,
  HttpModule,
  ModalModule,
  TabsModule,
  FormsModule,
  ToasterModule,
  ArtistavailRoutingModule,
  BsDatepickerModule.forRoot(),
  TimepickerModule.forRoot()
  ],
  declarations: [
    ArtistavailComponent,
    AddartistavailComponent,
    AddartistvacationComponent,
    AddartistgccComponent,
    ArtistvacationComponent,
    ArtistgccComponent,
	  DataFilterPipe
  ]
})
export class ArtistavailModule { }
