import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MakeupComponent } from './makeup.component';
import { AddmakeupComponent } from './addmakeup.component';

import { DataFilterPipe } from './datafilterpipe';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';

//Routing
import { MakeupRoutingModule } from './makeup-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  CommonModule,
  DataTableModule,
  HttpModule,
  FormsModule,
  ToasterModule,
  MakeupRoutingModule
  ],
  declarations: [
    MakeupComponent,
    AddmakeupComponent,
	DataFilterPipe
  ]
})
export class MakeupModule { }
