import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { SalonComponent } from './salon.component';

const routes: Routes = [
  {
    path: '',
    component: SalonComponent,
    data: {
      title: 'Salon'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalonRoutingModule {}
