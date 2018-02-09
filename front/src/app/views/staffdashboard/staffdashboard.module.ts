import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { StaffDashboardComponent } from './staffdashboard.component';
import { StaffDashboardRoutingModule } from './staffdashboard-routing.module';

@NgModule({
  imports: [
    FormsModule,
    StaffDashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [ StaffDashboardComponent ]
})
export class StaffDashboardModule { }
