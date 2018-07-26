import { Component, ViewEncapsulation } from '@angular/core';
import { HttpModule } from '@angular/http';
import {Injectable, Inject} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { API_URL } from '../../globals';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


// Toastr
import { ToasterModule, ToasterService, ToasterConfig , Toast}  from 'angular2-toaster/angular2-toaster';

@Component({
  templateUrl: 'changepassword.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})

@Injectable()
export class ChangepasswordComponent {

	private data: any;
  	private error: number;
 	private currency:any = localStorage.getItem('currentUserCurrency');
	private toasterService: ToasterService;

    public toasterconfig : ToasterConfig =
      new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
      });
    constructor(private NgxRolesService: NgxRolesService, private NgxPermissionsService: NgxPermissionsService, @Inject(Http) private http: Http, @Inject(Router)private router:Router, private activatedRoute: ActivatedRoute, toasterService: ToasterService) {
		//console.log(localStorage.getItem('currentUserRoleId'));
			
	    if(localStorage.getItem('currentUserRoleId') == "1"){
	      localStorage.setItem('currentUserRole', "ADMIN");
	    } else if(localStorage.getItem('currentUserRoleId') == "2"){
	      localStorage.setItem('currentUserRole', "ARTIST");
	    } else if(localStorage.getItem('currentUserRoleId') == "3"){
	      localStorage.setItem('currentUserRole', "SALON");
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
		this.toasterService = toasterService;
		

		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

    	this.data = {  
	        memberId: localStorage.getItem('currentUserId'),
	        oldPassword: '',
	        newPassword: ''
    	}

  	}

	onSubmit() {
		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

		this.http.post(API_URL+'/Members/change-password?access_token='+localStorage.getItem('currentUserToken'), this.data,  options)
		.subscribe(response => {
			
			var toast: Toast = {
			type: 'success',
			title: 'Success',
			body: "Password updated successfully.",
			onHideCallback: (toast) => this.router.navigate(['dashboard'])  
		  };
		   
		  this.toasterService.clear();	this.toasterService.pop(toast);		
			   
		}, error => {
			console.log(JSON.stringify(error.json()));
		});

	}

}
