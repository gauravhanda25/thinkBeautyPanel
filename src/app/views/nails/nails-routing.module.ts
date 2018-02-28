import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { NailsComponent } from './nails.component';
import { AddnailsComponent } from './addnails.component';

const routes: Routes = [
	{
		path: '',
		data: {
		  title: "Nails Service"
		},
	
	   children:[
	   {
		  
			path: '',
			component: NailsComponent,
			data: {
			  title: "Manage"
			}
		},
		{
			path: 'addnails',
			component: AddnailsComponent,
			data: {
			  title: "Add Nails"
			}
		},
		{
			 path: 'editnails/:id',
			component: AddnailsComponent,
			data: {
			  title: "Edit Nails"
			}
		}
		]	
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NailsRoutingModule {}
