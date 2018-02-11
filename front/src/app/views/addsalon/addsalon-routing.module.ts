import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { AddsalonComponent } from './addsalon.component';

const routes: Routes = [
  {
    path: '',
    component: AddsalonComponent,
    data: {
      title: 'Add Salon'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddsalonRoutingModule {}
