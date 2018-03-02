import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { ArtistavailComponent } from './artistavail.component';
import { AddartistavailComponent } from './addartistavail.component';

const routes: Routes = [
	{
		path: '',
		data: {
		  title: "Artist Services"
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
			  title: "Add Service"
			}
		},
		{
			 path: 'editartistavail/:id',
			component: AddartistavailComponent,
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
export class ArtistavailRoutingModule {}
