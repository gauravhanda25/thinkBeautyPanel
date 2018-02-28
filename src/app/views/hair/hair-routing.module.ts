import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { HairComponent } from './hair.component';
import { AddhairComponent } from './addhair.component';

const routes: Routes = [
	{
		path: '',
		data: {
		  title: "Hair Service"
		},
	
	   children:[
	   {
		  
			path: '',
			component: HairComponent,
			data: {
			  title: "Manage"
			}
		},
		{
			path: 'addhair',
			component: AddhairComponent,
			data: {
			  title: "Add Hair"
			}
		},
		{
			 path: 'edithair/:id',
			component: AddhairComponent,
			data: {
			  title: "Edit Hair"
			}
		}
		]	
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HairRoutingModule {}
