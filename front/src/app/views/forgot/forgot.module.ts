import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';


import { ForgotComponent } from './forgot.component';
import { ForgotRoutingModule } from './forgot-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  	CommonModule,
    FormsModule,
    ForgotRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ToasterModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ ForgotComponent ]
})
export class ForgotModule { }
