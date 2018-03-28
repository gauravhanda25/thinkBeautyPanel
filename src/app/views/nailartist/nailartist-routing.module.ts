import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { NailartistComponent } from './nailartist.component';

const routes: Routes = [
  {
    path: '',
    component: NailartistComponent,
    data: {
      title: 'Manage Nail Artists'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NailartistRoutingModule {}
