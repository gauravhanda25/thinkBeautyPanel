import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HairComponent } from './hair.component';
import { AddhairComponent } from './addhair.component';

import { DataFilterPipe } from './datafilterpipe';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';

//Routing
import { HairRoutingModule } from './hair-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  CommonModule,
  DataTableModule,
  HttpModule,
  FormsModule,
  ToasterModule,
  HairRoutingModule
  ],
  declarations: [
    HairComponent,
    AddhairComponent,
	DataFilterPipe
  ]
})
export class HairModule { }
