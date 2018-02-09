import { Component } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import {CommonModule} from '@angular/common';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { NgxPermissionsService, NgxRolesService, NgxPermissionsDirective } from 'ngx-permissions';
import { API_URL } from '../../globals';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html'
})


export class AppHeaderComponent {
	constructor(private NgxRolesService: NgxRolesService, private NgxPermissionsService: NgxPermissionsService, private router:Router, private http: Http) {
		this.data = {};
	}

	logout() {
	    let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
		
	    this.http.post(API_URL+'/Members/logout?access_token='+ localStorage.getItem('currentUserToken'), this.data ,  options)
	    .subscribe(response => {
          		console.log(response.json());
	    	}, error => {
	          console.log(error.json());
      		}
      	);
		localStorage.clear();
	    this.NgxRolesService.flushRoles();
	    this.router.navigate(['login']);
	}

 }
