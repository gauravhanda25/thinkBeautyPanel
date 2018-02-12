import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ArtistComponent } from './artist.component';

// DataTable
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
import { DataFilterPipe } from './datafilterpipe';

//Routing
import { ArtistRoutingModule } from './artist-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  	CommonModule,
  	FormsModule,
    DataTableModule,
   	ArtistRoutingModule,
    ToasterModule,
    HttpModule
  ],
  declarations: [
    ArtistComponent,
    DataFilterPipe
  ]
})
export class ArtistModule { }
