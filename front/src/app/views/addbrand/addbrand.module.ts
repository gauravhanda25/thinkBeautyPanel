import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

import { AddbrandComponent } from './addbrand.component';

//Routing
import { AddbrandRoutingModule } from './addbrand-routing.module';

@NgModule({
  imports: [
  	FormsModule,
    ChartsModule,
    CommonModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    AddbrandRoutingModule
  ],
  declarations: [
    AddbrandComponent
  ]
})
export class AddbrandModule { }
