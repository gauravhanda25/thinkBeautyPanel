import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { FaqComponent } from './faq.component';
import { AddfaqComponent } from './addfaq.component';

const routes: Routes = [
	{
		path: '',
		data: {
		  title: 'FAQ'
		},
	
	   children:[
	   {
		  
			path: '',
			component: FaqComponent,
			data: {
			  title: 'FAQ'
			}
		},
		{
			path: 'addfaq',
			component: AddfaqComponent,
			data: {
			  title: 'Add FAQ'
			}
		},
		{
			 path: 'editfaq/:id',
			component: AddfaqComponent,
			data: {
			  title: 'Edit FAQ'
			}
		}
		]	
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaqRoutingModule {}
