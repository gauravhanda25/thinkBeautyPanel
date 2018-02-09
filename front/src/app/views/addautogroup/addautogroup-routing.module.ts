import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { AddautogroupComponent } from './addautogroup.component';

const routes: Routes = [
  {
    path: '',
    component: AddautogroupComponent,
    data: {
      title: 'Add Oem'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddautogroupRoutingModule {}
