import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { LifetimerevenueComponent } from './lifetimerevenue.component';

const routes: Routes = [
  {
    path: '',
    component: LifetimerevenueComponent,
    data: {
      title: 'Manage Lifetime Revenue'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LifetimerevenueRoutingModule {}
