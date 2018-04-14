import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { ModalModule } from "ngx-bootstrap";

// DataTable
import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
import { DataFilterPipe } from './datafilterpipe';

//Routing
import { UsersRoutingModule } from './users-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  	CommonModule,
  	FormsModule,
    DataTableModule,
   	UsersRoutingModule,
    ToasterModule,
    HttpModule,
    ModalModule.forRoot()
  ],
  declarations: [
    UsersComponent,
    DataFilterPipe
  ]
})
export class UsersModule { }
