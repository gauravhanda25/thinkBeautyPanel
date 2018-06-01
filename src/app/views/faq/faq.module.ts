import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AddfaqComponent } from './addfaq.component';
import { FaqComponent } from './faq.component';

import { DataFilterPipe } from './datafilterpipe';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
//Routing
import {FaqRoutingModule } from './faq-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  CommonModule,
  DataTableModule,
  HttpModule,
  FormsModule,
  ToasterModule,
  FaqRoutingModule
  ],
  declarations: [
    FaqComponent,
    AddfaqComponent,
	DataFilterPipe
  ]
})
export class FaqModule { }
