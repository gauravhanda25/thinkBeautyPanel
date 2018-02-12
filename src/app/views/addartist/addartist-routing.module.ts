import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { AddartistComponent } from './addartist.component';

const routes: Routes = [
  {
    path: '',
    component: AddartistComponent,
    data: {
      title: 'Add Artist'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddartistRoutingModule {}
