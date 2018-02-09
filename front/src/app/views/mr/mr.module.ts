import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { MrComponent } from './mr.component';

import { DataFilterPipe } from './datafilterpipe';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
//Routing
import { MrRoutingModule } from './mr-routing.module';

@NgModule({
  imports: [
  CommonModule,
  DataTableModule,
  HttpModule,
  FormsModule,
    MrRoutingModule
  ],
  declarations: [
    MrComponent,
	DataFilterPipe
  ]
})
export class MrModule { }
