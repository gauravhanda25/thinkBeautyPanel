import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AddtermsComponent } from './addterms.component';
import { TermsComponent } from './terms.component';

import { DataFilterPipe } from './datafilterpipe';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
//Routing
import {TermsRoutingModule } from './terms-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  CommonModule,
  DataTableModule,
  HttpModule,
  FormsModule,
  ToasterModule,
  TermsRoutingModule
  ],
  declarations: [
    TermsComponent,
    AddtermsComponent,
	DataFilterPipe
  ]
})
export class TermsModule { }
