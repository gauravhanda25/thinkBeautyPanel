import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

import { AddoemComponent } from './addoem.component';

//Routing
import { AddoemRoutingModule } from './addoem-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  	FormsModule,
    ChartsModule,
    CommonModule,
	ToasterModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    AddoemRoutingModule
  ],
  declarations: [
    AddoemComponent
  ]
})
export class AddoemModule { }
