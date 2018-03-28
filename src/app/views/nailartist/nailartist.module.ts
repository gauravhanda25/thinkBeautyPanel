import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NailartistComponent } from './nailartist.component';

// DataTable
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
import { DataFilterPipe } from './datafilterpipe';

//Routing
import { NailartistRoutingModule } from './nailartist-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  	CommonModule,
  	FormsModule,
    DataTableModule,
   	NailartistRoutingModule,
    ToasterModule,
    HttpModule
  ],
  declarations: [
    NailartistComponent,
    DataFilterPipe
  ]
})
export class NailartistModule { }
