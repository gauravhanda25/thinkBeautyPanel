import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { SettingComponent } from './setting.component';
import { ChangepasswordComponent } from './changepassword.component';

// Ng2-select
import { SelectModule } from 'ng-select';
// Ng2-file-upload
import { FileSelectDirective, FileDropDirective, FileUploadModule, FileUploader } from 'ng2-file-upload';

// Datepicker
import { BsDatepickerModule } from 'ngx-bootstrap';
//Routing
import { SettingRoutingModule } from './setting-routing.module';


import emailMask from 'text-mask-addons/dist/emailMask';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

import * as moment from 'moment';
import { ModalModule } from "ngx-bootstrap";

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

import { TextMaskModule } from 'angular2-text-mask';


import { DataTableModule } from 'angular2-datatable';
import { HttpModule } from '@angular/http';
import { DataFilterPipe } from './datafilterpipe';




@NgModule({
  imports: [
  	CommonModule,
  	FormsModule,
    DataTableModule,
   	SettingRoutingModule,
    BsDropdownModule,
    TextMaskModule,
    ButtonsModule.forRoot(),
    ToasterModule,
    HttpModule,
    TabsModule,
    SelectModule,
    FileUploadModule,
 
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    SettingComponent,
    ChangepasswordComponent,
    DataFilterPipe
  ]
})
export class SettingModule { }
