import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsComponent } from './events.component';

//Routing
import { EventsRoutingModule } from './events-routing.module';

@NgModule({
  imports: [
    EventsRoutingModule
  ],
  declarations: [
    EventsComponent
  ]
})
export class EventsModule { }
