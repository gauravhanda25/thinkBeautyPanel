import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { MakeupComponent } from './makeup.component';
import { AddmakeupComponent } from './addmakeup.component';

const routes: Routes = [
	{
		path: '',
		data: {
		  title: "Makeup Service"
		},
	
	   children:[
	   {
		  
			path: '',
			component: MakeupComponent,
			data: {
			  title: "Manage"
			}
		},
		{
			path: 'addmakeup',
			component: AddmakeupComponent,
			data: {
			  title: "Add Makeup"
			}
		},
		{
			 path: 'editmakeup/:id',
			component: AddmakeupComponent,
			data: {
			  title: "Edit Makeup"
			}
		}
		]	
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MakeupRoutingModule {}
