import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailsComponent } from './emails.component';

//Routing
import { EmailsRoutingModule } from './emails-routing.module';

@NgModule({
  imports: [
    EmailsRoutingModule
  ],
  declarations: [
    EmailsComponent
  ]
})
export class EmailsModule { }
