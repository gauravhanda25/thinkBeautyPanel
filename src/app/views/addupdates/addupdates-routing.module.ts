import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { AddupdatesComponent } from './addupdates.component';

const routes: Routes = [
  {
    path: '',
    component: AddupdatesComponent,
    data: {
      title: 'Manage Updates'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddupdatesRoutingModule {}
