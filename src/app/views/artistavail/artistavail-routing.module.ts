import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { ArtistavailComponent } from './artistavail.component';
import { AddartistavailComponent } from './addartistavail.component';

const routes: Routes = [
	{
		path: '',
		data: {
		  title: "Availability"
		},
	
	   children:[
	   {
		  
			path: '',
			component: ArtistavailComponent,
			data: {
			  title: ""
			}
		},
		{
			path: 'addartistavail',
			component: AddartistavailComponent,
			data: {
			  title: "Add Availability"
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
