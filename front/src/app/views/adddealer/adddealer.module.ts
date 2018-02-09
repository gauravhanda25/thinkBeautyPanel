import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AdddealerComponent } from './adddealer.component';

import { TextMaskModule } from 'angular2-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';

//Routing
import { AdddealerRoutingModule } from './adddealer-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

// Ng2-file-upload
import { FileSelectDirective, FileDropDirective, FileUploadModule, FileUploader } from 'ng2-file-upload';

// Ng2-select
import { SelectModule } from 'ng-select';


// Datepicker
import { BsDatepickerModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
  	FormsModule,
    ChartsModule,
    CommonModule,
    BsDropdownModule,
    TabsModule,
    TextMaskModule,
    ToasterModule,
    SelectModule,
    FileUploadModule,
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    AdddealerRoutingModule
  ],
  declarations: [
    AdddealerComponent
  ]
})
export class AdddealerModule { }
