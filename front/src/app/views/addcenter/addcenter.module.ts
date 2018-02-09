import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

import { AddcenterComponent } from './addcenter.component';

//Routing
import { AddcenterRoutingModule } from './addcenter-routing.module';

@NgModule({
  imports: [
  	FormsModule,
    ChartsModule,
    CommonModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    AddcenterRoutingModule
  ],
  declarations: [
    AddcenterComponent
  ]
})
export class AddcenterModule { }
