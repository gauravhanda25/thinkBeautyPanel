import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { AddcenterComponent } from './addcenter.component';

const routes: Routes = [
  {
    path: '',
    component: AddcenterComponent,
    data: {
      title: 'Center'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddcenterRoutingModule {}
