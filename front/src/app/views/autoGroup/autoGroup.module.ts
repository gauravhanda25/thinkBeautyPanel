import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AutoGroupComponent } from './autoGroup.component';

import { DataFilterPipe } from './datafilterpipe';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';

//Routing
import { AutoGroupRoutingModule } from './autoGroup-routing.module';

@NgModule({
  imports: [
  CommonModule,
  DataTableModule,
  HttpModule,
  FormsModule,
    AutoGroupRoutingModule
  ],
  declarations: [
    AutoGroupComponent,
	 DataFilterPipe
  ]
})
export class AutoGroupModule { }
