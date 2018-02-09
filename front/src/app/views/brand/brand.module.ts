import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrandComponent } from './brand.component';

import { DataFilterPipe } from './datafilterpipe';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
//Routing
import { BrandRoutingModule } from './brand-routing.module';


@NgModule({
  imports: [
  CommonModule,
  DataTableModule,
  HttpModule,
  FormsModule,
    BrandRoutingModule
  ],
  declarations: [
    BrandComponent,
    DataFilterPipe
  ]
})
export class BrandModule { }
