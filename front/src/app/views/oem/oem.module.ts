import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { OemComponent } from './oem.component';

import { DataFilterPipe } from './datafilterpipe';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';

//Routing
import { OemRoutingModule } from './oem-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  CommonModule,
  DataTableModule,
  HttpModule,
  FormsModule,
  ToasterModule,
  OemRoutingModule
  ],
  declarations: [
    OemComponent,
	DataFilterPipe
  ]
})
export class OemModule { }
