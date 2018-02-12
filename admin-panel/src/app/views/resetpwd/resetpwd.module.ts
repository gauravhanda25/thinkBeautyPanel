import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ResetpwdComponent } from './resetpwd.component';
import { ResetpwdRoutingModule } from './resetpwd-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  	CommonModule,
    FormsModule,
    ResetpwdRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ToasterModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ ResetpwdComponent ]
})
export class ResetpwdModule { }
