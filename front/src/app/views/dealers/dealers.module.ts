import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// DataTable
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
import { DataFilterPipe } from './datafilterpipe';

import { DealersComponent } from './dealers.component';

//Routing
import { DealersRoutingModule } from './dealers-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  	CommonModule,
  	FormsModule,
    DealersRoutingModule,
    ToasterModule,
    DataTableModule
  ],
  declarations: [
    DealersComponent,
    DataFilterPipe
  ]
})
export class DealersModule { }
