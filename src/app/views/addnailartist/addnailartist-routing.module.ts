import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { AddnailartistComponent } from './addnailartist.component';

const routes: Routes = [
  {
    path: '',
    component: AddnailartistComponent,
    data: {
      title: 'Manage Nail Artists'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddnailartistRoutingModule {}
