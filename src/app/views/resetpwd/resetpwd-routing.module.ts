import { NgModule } from '@angular/core';
import { Routes,
     RouterModule } from '@angular/router';

import { ResetpwdComponent } from './resetpwd.component';

const routes: Routes = [
  {
    path: '',
    component: ResetpwdComponent,
    data: {
      title: 'ResetPassword'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResetpwdRoutingModule {}
