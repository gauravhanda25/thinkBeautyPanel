import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { AddbrandComponent } from './addbrand.component';

const routes: Routes = [
  {
    path: '',
    component: AddbrandComponent,
    data: {
      title: 'Add Brand'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddbrandRoutingModule {}
