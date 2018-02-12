import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admindashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    data: {
      title: 'Admin Dashboard'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDashboardRoutingModule {}
