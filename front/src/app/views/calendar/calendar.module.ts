import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

// Calendar
import { CalendarModule } from 'angular-calendar';

import { CalendarComponent } from './calendar.component';

//Routing
import { CalendarRoutingModule } from './calendar-routing.module';

// Toastr
import { ToasterModule, ToasterService} from 'angular2-toaster/angular2-toaster';

@NgModule({
  imports: [
  	FormsModule,
    ChartsModule,
    CommonModule,
    BsDropdownModule,
    ToasterModule,
    CalendarRoutingModule,
    CalendarModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  declarations: [
    CalendarComponent
  ]
})
export class CalendarInitModule { }
