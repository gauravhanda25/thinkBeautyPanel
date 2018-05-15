import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { MicrobladingComponent } from './microblading.component';
import { AddmicrobladingComponent } from './addmicroblading.component';

const routes: Routes = [
	{
		path: '',
		data: {
		  title: "Microblading Service"
		},
	
	   children:[
	   {
		  
			path: '',
			component: MicrobladingComponent,
			data: {
			  title: "Manage"
			}
		},
		{
			path: 'addmicroblading',
			component: AddmicrobladingComponent,
			data: {
			  title: "Add Microblading"
			}
		},
		{
			 path: 'editmicroblading/:id',
			component: AddmicrobladingComponent,
			data: {
			  title: "Edit Microblading"
			}
		}
		]	
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MicrobladingRoutingModule {}
