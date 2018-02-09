import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

import { AddartistComponent } from './addartist.component';

import { TextMaskModule } from 'angular2-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

//Routing
import { AddartistRoutingModule } from './addartist-routing.module';

@NgModule({
  imports: [
  	FormsModule,
    ChartsModule,
    CommonModule,
    BsDropdownModule,
    TextMaskModule,
    ButtonsModule.forRoot(),
    AddartistRoutingModule,
    ToasterModule,
  ],
  declarations: [
    AddartistComponent
  ]
})
export class AddartistModule { }
