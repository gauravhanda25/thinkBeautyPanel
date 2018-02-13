import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { ArtistComponent } from './artist.component';

const routes: Routes = [
  {
    path: '',
    component: ArtistComponent,
    data: {
      title: 'Manage Artists'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistRoutingModule {}
