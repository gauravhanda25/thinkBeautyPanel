import { Component, VERSION } from '@angular/core';
import {CommonModule} from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgxPermissionsService, NgxRolesService, NgxPermissionsDirective } from 'ngx-permissions';


@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent { 

	private display:any;
	private navigation:any = [];
	constructor(private NgxRolesService: NgxRolesService, private NgxPermissionsService: NgxPermissionsService) {
	    if(localStorage.getItem('currentUserRoleId') == "1"){
	      localStorage.setItem('currentUserRole', "ADMIN");
	      this.navigation = [{
          name: 'Dashboard',
          url: '/dashboard',
          icon: 'icon-speedometer',
        },
        {
          name: 'Manage Artists',
          url: '/manageartist',
          icon: 'icon-people',
          children: [
            {
              name: 'New Artist Requests',
              url: '/manageartist/newrequests',
              icon: 'icon-people',
            },
            {
              name: 'Verified Artists',
              url: '/manageartist/verified',
              icon: 'icon-people',
            },
            {
              name: 'Registered Artists',
              url: '/manageartist/registered',
              icon: 'icon-people',
            },
            {
              name: 'Rejected Artists',
              url: '/manageartist/rejected',
              icon: 'icon-people',
            },
            {
              name: 'Add New Artist',
              url: '/manageartist/addartist',
              icon: 'icon-people',
            },
          ]
        }, 
          {
          name: 'Manage Salons',
          url: '/managesalon',
          icon: 'icon-list',
                children: [
            {
          name: 'New Salon Requests',
          url: '/managesalon/newrequests',
          icon: 'icon-list',
        },
        {
          name: 'Verified Salons',
          url: '/managesalon/verified',
          icon: 'icon-list',
        },
          {
          name: 'Registered Salons',
          url: '/managesalon/registered',
          icon: 'icon-list',
        },
          {
          name: 'Rejected Salons',
          url: '/managesalon/rejected',
          icon: 'icon-list',
        },
            {
          name: 'Add New Salon',
          url: '/managesalon/addsalon',
          icon: 'icon-list',
        },
            ]
        }, 

        {
          name: 'Services',
          url: '/',
          icon: 'icon-settings',
          children: [
            {
              name: 'Makeup',
              url: '/makeup',
              icon: 'icon-list',
            },
            {
              name: 'Hair',
              url: '/hair',
              icon: 'icon-list',
            },
            {
              name: 'Nails',
              url: '/nails',
              icon: 'icon-list',
            }
          ]
        }];
      	    } else if(localStorage.getItem('currentUserRoleId') == "2"){
      	      localStorage.setItem('currentUserRole', "ARTIST");
      	      this.navigation = [{
      		    name: 'Dashboard',
      		    url: '/dashboard',
      		    icon: 'icon-speedometer',
      		  },
      		  {
      		    name: 'My Services',
      		    url: '/myservices',
      		    icon: 'icon-list',
      		  },
      		  {
      		    name: 'Schedule',
      		    url: '/schedule',
      		    icon: 'icon-clock',
      		    children: [
      		  
      		      {
      		        name: 'Work Availability',
      		        url: '/schedule/work',
      		        icon: 'icon-clock',
      		      },
      		      {
      		        name: 'Vacations',
      		        url: '/schedule/vacation',
      		        icon: 'icon-clock',
      		      },
      		      {
      		        name: 'GCC Availability',
      		        url: '/schedule/gcc',
      		        icon: 'icon-clock',
      		      }
      		    ]
      		  },
            {
              name: 'Upload',
              url: '/media',
              icon: 'icon-camera',
              children: [
            
                {
                  name: 'Gallery',
                  url: '/media/gallery',
                  icon: 'icon-camera',
                },
                {
                  name: 'Main Images',
                  url: '/media/main',
                  icon: 'icon-camera',
                }
              ]
            },
            {
              name: "What's New",
              url: '/updates/manage',
              icon: 'icon-list',
            }

            ];
      	    } else if(localStorage.getItem('currentUserRoleId') == "3"){
              localStorage.setItem('currentUserRole', "SALON");
              this.navigation = [{
              name: 'Dashboard',
              url: '/dashboard',
              icon: 'icon-speedometer',
            },
            {
              name: 'My Services',
              url: '/myservices',
              icon: 'icon-list',
            },
            {
              name: 'Manage Employees',
              url: '/nailartists/manage',
              icon: 'icon-list',
            },
            {
              name: 'Schedule',
              url: '/schedule',
              icon: 'icon-clock',
              children: [
            
                {
                  name: 'Work Availability',
                  url: '/schedule/work',
                  icon: 'icon-clock',
                },
                {
                  name: 'Vacations',
                  url: '/schedule/vacation',
                  icon: 'icon-clock',
                }
              ]
            },
            {
              name: 'Upload',
              url: '/media',
              icon: 'icon-camera',
              children: [
            
                {
                  name: 'Gallery',
                  url: '/media/gallery',
                  icon: 'icon-camera',
                },
                {
                  name: 'Main Images',
                  url: '/media/main',
                  icon: 'icon-camera',
                }
              ]
            }
          ];
      	} 

		  this.NgxRolesService.flushRoles();

	   if(localStorage.getItem('currentUserRole') != null) { 
	   	this.NgxRolesService.addRole(localStorage.getItem('currentUserRole'), ['A'] );
	   } else {
	   	this.NgxRolesService.addRole("GUEST", ['A'] );	   
	   }

	    let roles = NgxRolesService.getRoles();
	    NgxRolesService.roles$.subscribe((data) => {
	        console.log(data);
	    })

	    if(localStorage.getItem('loader') == "true"){
	    	this.display = 1;
	    } else if(localStorage.getItem('loader') == "false"){
	      this.display = 0;
	    } 
	    

  
  }

  public isDivider(item) {
    return item.divider ? true : false
  }

  public isTitle(item) {
    return item.title ? true : false
  }


}
