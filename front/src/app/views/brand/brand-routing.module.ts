import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { BrandComponent } from './brand.component';

const routes: Routes = [
  {
    path: '',
    component: BrandComponent,
    data: {
      title: 'Brand'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule {}
