import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CenterComponent } from './center.component';

import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
import { DataFilterPipe } from './datafilterpipe';
//Routing
import { CenterRoutingModule } from './center-routing.module';


@NgModule({
  imports: [
  CommonModule,
  DataTableModule,
  HttpModule,
  FormsModule,
    CenterRoutingModule
  ],
  declarations: [
    CenterComponent,
	 DataFilterPipe
  ]
})
export class CenterModule { }
