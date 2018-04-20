import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LifetimerevenueComponent } from './lifetimerevenue.component';
import { ModalModule } from "ngx-bootstrap";

// DataTable
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
import { DataFilterPipe } from './datafilterpipe';

//Routing
import { LifetimerevenueRoutingModule } from './lifetimerevenue-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

// Datepicker
import { BsDatepickerModule } from 'ngx-bootstrap';


@NgModule({
  imports: [
  	CommonModule,
  	FormsModule,
    DataTableModule,
   	LifetimerevenueRoutingModule,
    ToasterModule,
    HttpModule,
    ModalModule.forRoot()
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    LifetimerevenueComponent,
    DataFilterPipe
  ]
})
export class LifetimerevenueModule { }
