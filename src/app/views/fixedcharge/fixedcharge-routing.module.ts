import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { FixedchargeComponent } from './fixedcharge.component';
import { AddfixedchargeComponent } from './addfixedcharge.component';

const routes: Routes = [
	{
		path: '',
		data: {
		  title: 'Fixed Charge'
		},
	
	   children:[
	   {
		  
			path: '',
			component: FixedchargeComponent,
			data: {
			  title: 'Fixed Charge'
			}
		},
		{
			path: 'addfixedcharge',
			component: AddfixedchargeComponent,
			data: {
			  title: 'Add fixed charge'
			}
		},
		{
			 path: 'editfixedcharge/:id',
			component: AddfixedchargeComponent,
			data: {
			  title: 'Edit fixed charge'
			}
		}
		]	
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FixedchargeRoutingModule {}
