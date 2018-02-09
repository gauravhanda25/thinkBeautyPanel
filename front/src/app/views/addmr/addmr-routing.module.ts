import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { AddmrComponent } from './addmr.component';

const routes: Routes = [
  {
    path: '',
    component: AddmrComponent,
    data: {
      title: 'Add MR'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddmrRoutingModule {}
