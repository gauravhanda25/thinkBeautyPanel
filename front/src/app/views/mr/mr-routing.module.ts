import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MrComponent } from './mr.component';

const routes: Routes = [
    {
      path: '',
      component: MrComponent,
      data: {
        title: 'Mr'
      }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MrRoutingModule {}
