import { NgModule } from '@angular/core';
import { Routes,     RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { AddmainComponent } from './addmain.component';
import { GalleryComponent } from './gallery.component';
import { AddgalleryComponent } from './addgallery.component';


const routes: Routes = [
	{
		path: '',
		data: {
		  title: "Media"
		},
	
	   children:[
	   {
		  
			path: 'gallery',
			component: GalleryComponent,
			data: {
			  title: "Manage Gallery Images"
			}
		},
		{
			path: 'gallery/add',
			component: AddgalleryComponent,
			data: {
			  title: "Add New Gallery Images"
			}
		},
		{
			path: 'main',
			component: MainComponent,
			data: {
			  title: "Manage Main Images"
			}
		},
		{
			path: 'main/add',
			component: AddmainComponent,
			data: {
			  title: "Add New Images"
			}
		}
		]	
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule {}
