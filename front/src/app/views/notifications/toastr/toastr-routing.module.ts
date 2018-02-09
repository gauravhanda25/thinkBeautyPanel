import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToastrComponent } from './toastr.component';

const routes: Routes = [
  {
    path: '',
    component: ToastrComponent,
    data: {
      title: 'Toastr'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToastrRoutingModule {}
