import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { CommissionComponent } from './commission.component';
import { AddcommissionComponent } from './addcommission.component';

const routes: Routes = [
	{
		path: '',
		data: {
		  title: 'Commission'
		},
	
	   children:[
	   {
		  
			path: '',
			component: CommissionComponent,
			data: {
			  title: 'Commission'
			}
		},
		{
			path: 'addcommission',
			component: AddcommissionComponent,
			data: {
			  title: 'Add commission'
			}
		},
		{
			 path: 'editcommission/:id',
			component: AddcommissionComponent,
			data: {
			  title: 'Edit commission'
			}
		}
		]	
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionRoutingModule {}
