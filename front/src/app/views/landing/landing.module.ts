import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { LandingComponent } from './landing.component';

// DataTable
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
import { DataFilterPipe } from './datafilterpipe';

//Routing
import { LandingRoutingModule } from './landing-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  	CommonModule,
  	FormsModule,
    DataTableModule,
   	LandingRoutingModule,
    ToasterModule,
    HttpModule
  ],
  declarations: [
    LandingComponent,
    DataFilterPipe
  ]
})
export class LandingModule { }
