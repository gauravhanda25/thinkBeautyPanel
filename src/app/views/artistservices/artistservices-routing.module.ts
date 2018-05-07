import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { ArtistservicesComponent } from './artistservices.component';
import { AddartistservicesComponent } from './addartistservices.component';

const routes: Routes = [
	{
		path: '',
		data: {
		  title: "Services"
		},
	
	   children:[
	   {
		  
			path: '',
			component: ArtistservicesComponent,
			data: {
			  title: ""
			}
		},
		{
			path: 'addartistservices',
			component: AddartistservicesComponent,
			data: {
			  title: "Add New Service"
			}
		},
		{
			path: 'addartistservices/:service',
			component: AddartistservicesComponent,
			data: {
			  title: "Add New Service"
			}
		},
		{
			 path: 'editartistservices/:id',
			component: AddartistservicesComponent,
			data: {
			  title: "Edit Service"
			}
		}
		]	
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistservicesRoutingModule {}
