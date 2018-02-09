import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesComponent } from './tables.component';

//Routing
import { TablesRoutingModule } from './tables-routing.module';

@NgModule({
  imports: [
    TablesRoutingModule
  ],
  declarations: [
    TablesComponent
  ]
})
export class TablesModule { }
