import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesComponent } from './invoices.component';

//Routing
import { InvoicesRoutingModule } from './invoices-routing.module';

@NgModule({
  imports: [
    InvoicesRoutingModule
  ],
  declarations: [
    InvoicesComponent
  ]
})
export class InvoicesModule { }
