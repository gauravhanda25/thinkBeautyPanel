import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { TermsComponent } from './terms.component';
import { AddtermsComponent } from './addterms.component';

const routes: Routes = [
	{
		path: '',
		data: {
		  title: 'Terms'
		},
	
	   children:[
	   {
		  
			path: '',
			component: TermsComponent,
			data: {
			  title: 'Terms'
			}
		},
		{
			path: 'addterms',
			component: AddtermsComponent,
			data: {
			  title: 'Add terms'
			}
		},
		{
			 path: 'editterms/:id',
			component: AddtermsComponent,
			data: {
			  title: 'Edit terms'
			}
		}
		]	
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TermsRoutingModule {}
