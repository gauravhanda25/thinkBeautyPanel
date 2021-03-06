import { Component, VERSION } from '@angular/core';
import {CommonModule} from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgxPermissionsService, NgxRolesService, NgxPermissionsDirective } from 'ngx-permissions';

@Component({
  templateUrl: 'admindashboard.component.html'
})

export class AdminDashboardComponent {

  constructor(private NgxRolesService: NgxRolesService, private NgxPermissionsService: NgxPermissionsService) {

    if(localStorage.getItem('currentUserRoleId') == "1"){
      localStorage.setItem('currentUserRole', "ADMIN");
    } else if(localStorage.getItem('currentUserRoleId') == "2"){
      localStorage.setItem('currentUserRole', "ARTIST");
    } else if(localStorage.getItem('currentUserRoleId') == "3"){
      localStorage.setItem('currentUserRole', "SALON");
    } 

   if(localStorage.getItem('currentUserRole') != null) { 
      this.NgxRolesService.addRole(localStorage.getItem('currentUserRole'), ['A'] );
     } else {
      this.NgxRolesService.addRole("GUEST", ['A'] );     
     }

    let roles = NgxRolesService.getRoles();
  	NgxRolesService.roles$.subscribe((data) => {
  	    console.log(data);
  	})
  }

  yourCustomAuthorizedFunction() {
  	console.log('here auth');
  }

  yourCustomUnAuthorizedFunction() {
  	console.log('here un');
  }

}
