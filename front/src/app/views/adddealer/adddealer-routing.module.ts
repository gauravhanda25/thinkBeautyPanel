import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { AdddealerComponent } from './adddealer.component';

const routes: Routes = [
  {
    path: '',
    component: AdddealerComponent,
    data: {
      title: 'Add Dealer'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdddealerRoutingModule {}
