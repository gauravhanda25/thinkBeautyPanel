import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ContactRoleComponent } from './contactrole.component';

import { DataFilterPipe } from './datafilterpipe';
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';

//Routing
import {ContactRoleRoutingModule } from './contactrole-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  CommonModule,
  DataTableModule,
  HttpModule,
  FormsModule,
  ToasterModule,
  ContactRoleRoutingModule
  ],
  declarations: [
    ContactRoleComponent,
	DataFilterPipe
  ]
})
export class ContactRoleModule { }
