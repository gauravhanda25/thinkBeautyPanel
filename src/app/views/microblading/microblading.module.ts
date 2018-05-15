import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MicrobladingComponent } from './microblading.component';
import { AddmicrobladingComponent } from './addmicroblading.component';

import { DataFilterPipe } from './datafilterpipe';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';

//Routing
import { MicrobladingRoutingModule } from './microblading-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  CommonModule,
  DataTableModule,
  HttpModule,
  FormsModule,
  ToasterModule,
  MicrobladingRoutingModule
  ],
  declarations: [
    MicrobladingComponent,
    AddmicrobladingComponent,
	DataFilterPipe
  ]
})
export class MicrobladingModule { }
