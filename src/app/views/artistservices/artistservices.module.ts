import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ArtistservicesComponent } from './artistservices.component';
import { AddartistservicesComponent } from './addartistservices.component';

import { DataFilterPipe } from './datafilterpipe';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';

//Routing
import { ArtistservicesRoutingModule } from './artistservices-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  CommonModule,
  DataTableModule,
  HttpModule,
  FormsModule,
  ToasterModule,
  ArtistservicesRoutingModule
  ],
  declarations: [
    ArtistservicesComponent,
    AddartistservicesComponent,
	DataFilterPipe
  ]
})
export class ArtistservicesModule { }
