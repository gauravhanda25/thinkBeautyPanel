import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ArtistservicesComponent } from './artistservices.component';
import { AddartistservicesComponent } from './addartistservices.component';

import { DataFilterPipe } from './datafilterpipe';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';


import { ModalModule } from "ngx-bootstrap";

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

//Routing
import { ArtistservicesRoutingModule } from './artistservices-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

// Ng2-file-upload
import { FileSelectDirective, FileDropDirective, FileUploadModule, FileUploader } from 'ng2-file-upload';

// Ng2-select
import { SelectModule } from 'ng-select';


// Datepicker
import { BsDatepickerModule } from 'ngx-bootstrap';


// Timepicker
import { TimepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
  CommonModule,
  DataTableModule,
  HttpModule,
  TabsModule,
  FormsModule,
  ToasterModule,
  SelectModule,
  FileUploadModule,
  BsDatepickerModule.forRoot(),
  TimepickerModule.forRoot(),
  ArtistservicesRoutingModule,
  ModalModule.forRoot()
  ],
  declarations: [
    ArtistservicesComponent,
    AddartistservicesComponent,
	  DataFilterPipe
  ]
})
export class ArtistservicesModule { }
