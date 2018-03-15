import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { ArtistavailComponent } from './artistavail.component';
import { AddartistavailComponent } from './addartistavail.component';
import { AddartistvacationComponent } from './addartistvacation.component';
import { AddartistgccComponent } from './addartistgcc.component';
import { ArtistvacationComponent } from './artistvacation.component';
import { ArtistgccComponent } from './artistgcc.component';


const routes: Routes = [
	{
		path: '',
		data: {
		  title: "Schedule"
		},
	
	   children:[
	   {
		  
			path: 'work',
			component: ArtistavailComponent,
			data: {
			  title: "Manage Work Availability"
			}
		},
		{
			path: 'work/addartistworking',
			component: AddartistavailComponent,
			data: {
			  title: "Add/Edit Working Availability"
			}
		},
		{
			path: 'work/addartistweekend',
			component: AddartistavailComponent,
			data: {
			  title: "Add/Edit Weekend Availability"
			}
		},
		{
			path: 'work/addartistspecificdate',
			component: AddartistavailComponent,
			data: {
			  title: "Add/Edit Availability on Specific Date"
			}
		},
		{
			path: 'work/addartistbreak/:scheduletype',
			component: AddartistavailComponent,
			data: {
			  title: "Add/Edit Break"
			}
		},
		{
			path: 'vacation',
			component: ArtistvacationComponent,
			data: {
			  title: "Manage Vacation Time"
			}
		},
		{
			path: 'vacation/addartistvacation',
			component: AddartistvacationComponent,
			data: {
			  title: "Add/Edit Vacation Time"
			}
		},
		{
			path: 'gcc',
			component: ArtistgccComponent,
			data: {
			  title: "Manage GCC Availability"
			}
		},
		{
			path: 'gcc/addartistgcc',
			component: AddartistgccComponent,
			data: {
			  title: "Add/Edit GCC Availability"
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
