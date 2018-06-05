import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { NetprofitreportComponent } from './netprofitreport.component';

const routes: Routes = [
  {
    path: '',
    component: NetprofitreportComponent,
    data: {
      title: 'Manage Lifetime Revenue'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NetprofitreportRoutingModule {}
