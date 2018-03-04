import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import {Injectable, Inject} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { RouterModule, Routes, Router, NavigationEnd } from '@angular/router';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  constructor(private NgxRolesService: NgxRolesService, private NgxPermissionsService: NgxPermissionsService, private http: Http, private router:Router) {
    NgxPermissionsService.loadPermissions(["A"]);
    this.NgxRolesService.addRole("GUEST", ['A'] );
  }

  ngOnInit() {
    this.NgxPermissionsService.loadPermissions(["A"]);
    if(localStorage.getItem('currentUserRoleId') == "1"){
        localStorage.setItem('currentUserRole', "ADMIN");
      } else if(localStorage.getItem('currentUserRoleId') == "2"){
        localStorage.setItem('currentUserRole', "ARTIST");
      } else if(localStorage.getItem('currentUserRoleId') == "3"){
        localStorage.setItem('currentUserRole', "SALON");
      } 

      this.NgxRolesService.flushRoles();

      this.NgxRolesService.addRole(localStorage.getItem('currentUserRole'), ['A']  );
      
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }
}
