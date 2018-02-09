import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { ContactRoleComponent } from './contactrole.component';

const routes: Routes = [
  {
    path: '',
    component: ContactRoleComponent,
    data: {
      title: 'contactrole'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoleRoutingModule {}
