import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { AddmainComponent } from './addmain.component';
import { GalleryComponent } from './gallery.component';
import { AddgalleryComponent } from './addgallery.component';

import { DataFilterPipe } from './datafilterpipe';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
import * as moment from 'moment';
import * as $ from 'jquery';
import { ModalModule } from "ngx-bootstrap";

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

//Routing
import { MediaRoutingModule } from './media-routing.module';

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
  MediaRoutingModule,
  BsDatepickerModule.forRoot(),
  TimepickerModule.forRoot()
  ],
  declarations: [
    MainComponent,
    AddmainComponent,
    GalleryComponent,
    AddgalleryComponent,
	  DataFilterPipe
  ]
})
export class MediaModule { }
