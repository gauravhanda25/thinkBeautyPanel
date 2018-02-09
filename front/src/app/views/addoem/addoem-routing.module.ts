import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { AddoemComponent } from './addoem.component';

const routes: Routes = [
  {
    path: '',
    component: AddoemComponent,
    data: {
      title: 'Add Oem'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddoemRoutingModule {}
