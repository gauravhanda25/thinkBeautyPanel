import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

import { AddupdatesComponent } from './addupdates.component';

import { TextMaskModule } from 'angular2-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

//Routing
import { AddupdatesRoutingModule } from './addupdates-routing.module';

@NgModule({
  imports: [
  	FormsModule,
    ChartsModule,
    CommonModule,
    BsDropdownModule,
    TextMaskModule,
    ButtonsModule.forRoot(),
    AddupdatesRoutingModule,
    ToasterModule,
  ],
  declarations: [
    AddupdatesComponent
  ]
})
export class AddupdatesModule { }
