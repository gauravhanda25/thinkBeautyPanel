import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { OemComponent } from './oem.component';

const routes: Routes = [
  {
    path: '',
    component: OemComponent,
    data: {
      title: 'Oem'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OemRoutingModule {}
