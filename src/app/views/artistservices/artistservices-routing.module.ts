import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { ArtistservicesComponent } from './artistservices.component';
import { AddartistservicesComponent } from './addartistservices.component';

const routes: Routes = [
	{
		path: '',
		data: {
		  title: "Artist Services"
		},
	
	   children:[
	   {
		  
			path: '',
			component: ArtistservicesComponent,
			data: {
			  title: "Manage"
			}
		},
		{
			path: 'addartistservices',
			component: AddartistservicesComponent,
			data: {
			  title: "Add Service"
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
