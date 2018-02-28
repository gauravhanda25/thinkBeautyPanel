import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NailsComponent } from './nails.component';
import { AddnailsComponent } from './addnails.component';

import { DataFilterPipe } from './datafilterpipe';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';

//Routing
import { NailsRoutingModule } from './nails-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  CommonModule,
  DataTableModule,
  HttpModule,
  FormsModule,
  ToasterModule,
  NailsRoutingModule
  ],
  declarations: [
    NailsComponent,
    AddnailsComponent,
	DataFilterPipe
  ]
})
export class NailsModule { }
