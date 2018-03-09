import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { ArtistavailComponent } from './artistavail.component';
import { AddartistavailComponent } from './addartistavail.component';
import { AddartistvacationComponent } from './addartistvacation.component';

const routes: Routes = [
	{
		path: '',
		data: {
		  title: "Artist Availability"
		},
	
	   children:[
	   {
		  
			path: '',
			component: ArtistavailComponent,
			data: {
			  title: "Manage"
			}
		},
		{
			path: 'addartistavail',
			component: AddartistavailComponent,
			data: {
			  title: "Add/Edit Availability"
			}
		},
		{
			path: 'addartistvacation',
			component: AddartistvacationComponent,
			data: {
			  title: "Add/Edit Vacation Time"
			}
		},
		{
			 path: 'editartistavail/:id',
			component: AddartistavailComponent,
			data: {
			  title: "Edit Availability"
			}
		}
		]	
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArtistavailRoutingModule {}
