import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { UpdatesComponent } from './updates.component';

// DataTable
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
import { DataFilterPipe } from './datafilterpipe';

//Routing
import { UpdatesRoutingModule } from './updates-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  	CommonModule,
  	FormsModule,
    DataTableModule,
   	UpdatesRoutingModule,
    ToasterModule,
    HttpModule
  ],
  declarations: [
    UpdatesComponent,
    DataFilterPipe
  ]
})
export class UpdatesModule { }
