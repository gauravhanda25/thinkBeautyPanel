import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { VerifyComponent } from './verify.component';
import { VerifyRoutingModule } from './verify-routing.module';

@NgModule({
  imports: [
    FormsModule,
    VerifyRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ VerifyComponent ]
})
export class VerifyModule { }
