import { Component, VERSION } from '@angular/core';
import {CommonModule} from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgxPermissionsService, NgxRolesService, NgxPermissionsDirective } from 'ngx-permissions';

@Component({
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent {

  constructor(private NgxRolesService: NgxRolesService, private NgxPermissionsService: NgxPermissionsService) {

    if(localStorage.getItem('currentUserRoleId') == "1"){
      localStorage.setItem('currentUserRole', "ADMIN");
    } else if(localStorage.getItem('currentUserRoleId') == "2"){
      localStorage.setItem('currentUserRole', "TRAINER");
    } else if(localStorage.getItem('currentUserRoleId') == "3"){
      localStorage.setItem('currentUserRole', "REGIONAL");
    } else if(localStorage.getItem('currentUserRoleId') == "4"){
      localStorage.setItem('currentUserRole', "ACCOUNT");
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
  }

}
