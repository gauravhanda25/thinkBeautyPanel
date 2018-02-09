import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoicesComponent } from './invoices.component';

const routes: Routes = [
    {
      path: '',
      component: InvoicesComponent,
      data: {
        title: 'Invoices'
      }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule {}
