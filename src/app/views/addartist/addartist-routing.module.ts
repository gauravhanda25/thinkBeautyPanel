import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { AddartistComponent } from './addartist.component';

const routes: Routes = [
  {
    path: '',
    component: AddartistComponent,
    data: {
      title: 'Manage Artists'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddartistRoutingModule {}
