import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { SalonComponent } from './salon.component';

const routes: Routes = [
  {
    path: '',
    component: SalonComponent,
    data: {
      title: 'Manage Salons'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalonRoutingModule {}
