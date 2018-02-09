import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { AddcontactroleComponent } from './addcontactrole.component';

const routes: Routes = [
  {
    path: '',
    component: AddcontactroleComponent,
    data: {
      title: 'Add contactrole'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddcontactroleRoutingModule {}
