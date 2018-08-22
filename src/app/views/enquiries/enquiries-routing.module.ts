import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { EnquiriesComponent } from './enquiries.component';
import { AddenquiriesComponent } from './addenquiries.component';

const routes: Routes = [
	{
		path: '',
		data: {
		  title: 'Enquiries'
		},
	
	   children:[
	   {
		  
			path: '',
			component: EnquiriesComponent,
			data: {
			  title: 'Enquiries'
			}
		},
		{
			path: 'addenquiries',
			component: AddenquiriesComponent,
			data: {
			  title: 'Add enquiries'
			}
		},
		{
			 path: 'editenquiries/:id',
			component: AddenquiriesComponent,
			data: {
			  title: 'Edit enquiries'
			}
		}
		]	
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnquiriesRoutingModule {}
