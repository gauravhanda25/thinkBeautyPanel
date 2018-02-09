import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { StaffDashboardComponent } from './staffdashboard.component';

const routes: Routes = [
  {
    path: '',
    component: StaffDashboardComponent,
    data: {
      title: 'Staff Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffDashboardRoutingModule {}
