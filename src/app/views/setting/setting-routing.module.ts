import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { SettingComponent } from './setting.component';
import { ChangepasswordComponent } from './changepassword.component';

const routes: Routes = [
	{
		path: '',
		data: {
		  title: "Setting"
		},
	
	   children:[
	  		{
				path: 'edit',
				component: ChangepasswordComponent,
				data: {
				  title: "Change Password"
				}
			}
		]	
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {}
