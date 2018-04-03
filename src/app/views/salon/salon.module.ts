import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { SalonComponent } from './salon.component';
import { ModalModule } from "ngx-bootstrap";

// DataTable
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
import { DataFilterPipe } from './datafilterpipe';

//Routing
import { SalonRoutingModule } from './salon-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  	CommonModule,
  	FormsModule,
    DataTableModule,
   	SalonRoutingModule,
    ToasterModule,
    HttpModule,
    ModalModule.forRoot()
  ],
  declarations: [
    SalonComponent,
    DataFilterPipe
  ]
})
export class SalonModule { }
