import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { AddadvertisingagencyComponent } from './addadvertisingagency.component';

const routes: Routes = [
  {
    path: '',
    component: AddadvertisingagencyComponent,
    data: {
      title: 'Add Advertising Agency'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddadvertisingagencyRoutingModule {}
