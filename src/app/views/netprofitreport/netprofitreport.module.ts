import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NetprofitreportComponent } from './netprofitreport.component';
import { ModalModule } from "ngx-bootstrap";

// DataTable
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
import { DataFilterPipe } from './datafilterpipe';

//Routing
import { NetprofitreportRoutingModule } from './netprofitreport-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

// Datepicker
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap';


@NgModule({
  imports: [
  	CommonModule,
  	FormsModule,
    DataTableModule,
   	NetprofitreportRoutingModule,
    ToasterModule,
    HttpModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    NetprofitreportComponent,
    DataFilterPipe
  ]
})
export class NetprofitreportModule { }
