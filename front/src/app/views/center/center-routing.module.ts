import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { CenterComponent } from './center.component';

const routes: Routes = [
  {
    path: '',
    component: CenterComponent,
    data: {
      title: 'Center'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CenterRoutingModule {}
