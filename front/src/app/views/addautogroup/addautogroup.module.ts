import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

import { AddautogroupComponent } from './addautogroup.component';

//Routing
import { AddautogroupRoutingModule } from './addautogroup-routing.module';


// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AdddealerComponent } from './adddealer.component';

import { TextMaskModule } from 'angular2-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  	FormsModule,
    ChartsModule,
    CommonModule,
	TabsModule,
	TextMaskModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
	ToasterModule,
    AddautogroupRoutingModule
  ],
  declarations: [
    AddautogroupComponent
  ]
})
export class AddautogroupModule { }
