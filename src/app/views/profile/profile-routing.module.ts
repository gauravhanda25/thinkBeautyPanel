import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { AddstaffComponent } from './addstaff.component';
import { AdddealerComponent } from './adddealer.component';

const routes: Routes = [
	{
		path: '',
		data: {
		  title: "Profile"
		},
	
	   children:[
	  		{
				path: 'edit',
				component: AddstaffComponent,
				data: {
				  title: "Edit Profile"
				}
			}
		]	
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
