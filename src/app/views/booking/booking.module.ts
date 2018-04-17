import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BookingComponent } from './booking.component';
import { ModalModule } from "ngx-bootstrap";

// DataTable
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
import { DataFilterPipe } from './datafilterpipe';

//Routing
import { BookingRoutingModule } from './booking-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  	CommonModule,
  	FormsModule,
    DataTableModule,
   	BookingRoutingModule,
    ToasterModule,
    HttpModule,
    ModalModule.forRoot()
  ],
  declarations: [
    BookingComponent,
    DataFilterPipe
  ]
})
export class BookingModule { }
