import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

// Tabs Component


import { TextMaskModule } from 'angular2-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';
import { AddmrComponent } from './addmr.component';

//Routing
import { AddmrRoutingModule } from './addmr-routing.module';

@NgModule({
  imports: [
  	FormsModule,
    ChartsModule,
    CommonModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    AddmrRoutingModule
  ],
  declarations: [
    AddmrComponent
  ]
})
export class AddmrModule { }
