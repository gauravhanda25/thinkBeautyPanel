import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

import { ToastrComponent } from './toastr.component';

//Routing
import { ToastrRoutingModule } from './toastr-routing.module';

@NgModule({
  imports: [
    ToastrRoutingModule,
    CommonModule,
    ToasterModule,
  ],
  declarations: [
    ToastrComponent
  ]
})
export class ToastrModule { }
