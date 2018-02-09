import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

import { AdminDashboardComponent } from './admindashboard.component';
import { AdminDashboardRoutingModule } from './admindashboard-routing.module';
import { NgxPermissionsModule, NgxPermissionsService, NgxRolesService, NgxPermissionsDirective } from 'ngx-permissions';

@NgModule({
  imports: [
  	CommonModule,
    FormsModule,
    AdminDashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    NgxPermissionsModule.forRoot(),
  ],
  declarations: [ AdminDashboardComponent ]
})
export class AdminDashboardModule { }
