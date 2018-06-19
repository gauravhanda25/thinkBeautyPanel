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
import { ToasterModule, ToasterService, ToasterConfig, Toast }  from 'angular2-toaster/angular2-toaster';

@Component({
	templateUrl: 'addmicroblading.component.html',
	styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
	encapsulation: ViewEncapsulation.None
})

@Injectable()
export class AddmicrobladingComponent {
	private data: any;
  	private editparam: any;

	private toasterService: ToasterService;
	public toasterconfig : ToasterConfig =
	  new ToasterConfig({
		tapToDismiss: true,
		timeout: 5000
	  });
	  
	  
    constructor(private NgxRolesService: NgxRolesService, private NgxPermissionsService: NgxPermissionsService, @Inject(Http) private http: Http, @Inject(Router)private router:Router, private activatedRoute: ActivatedRoute,toasterService: ToasterService) {
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
    		name:'',
    		status:'',
    		created_by: localStorage.getItem('currentUserId')
    	}

    	this.editparam = {
    		id: '',
    		action: 'add'
    	}

    	this.activatedRoute.params.subscribe((params) => {
	        let id = params['id'];
	        this.editparam.id = id;
	    });

	    if(this.editparam.id != undefined) {
	    	let options = new RequestOptions();
	        options.headers = new Headers();
	        options.headers.append('Content-Type', 'application/json');
	        options.headers.append('Accept', 'application/json');

	    	this.http.get(API_URL+'/Microbladings/'+ this.editparam.id +'?access_token='+ localStorage.getItem('currentUserToken'), options)
	        .subscribe(response => {
	        	//console.log(response.json());	
	        	this.data = response.json();
	        	this.data.created_by = localStorage.getItem('currentUserId');
	        	this.editparam.action = "edit";
		    }, error => {
		        console.log(JSON.stringify(error.json()));
		    });
	    }


  	}

	onSubmit() {
		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
		
		console.log(this.editparam.id);

		if(this.editparam.id  == undefined){
			this.http.post(API_URL+'/Microbladings?access_token='+localStorage.getItem('currentUserToken'), this.data,  options)
			.subscribe(response => {
				
				var toast: Toast = {
				type: 'success',
				title: 'Success',
				body: "Microblading Service Record added successfully.",
				onHideCallback: (toast) => this.router.navigate(['microblading'])  
			  };
			   
			  this.toasterService.clear();	this.toasterService.pop(toast);	
				   
			}, error => {
				this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  error.json().error.message);
				console.log(JSON.stringify(error.json()));
			});
			
		} else {

			this.http.post(API_URL+'/Microbladings/update?where=%7B%22id%22%3A%22'+  this.editparam.id +'%22%7D&access_token='+ localStorage.getItem('currentUserToken'), this.data,  options)
	        .subscribe(response => {

				var toast: Toast = {
				type: 'success',
				title: 'Success',
				body: "Microblading Service Record updated successfully.",
				onHideCallback: (toast) => this.router.navigate(['microblading'])  
			  };
			   
			  this.toasterService.clear();	this.toasterService.pop(toast);	
		    }, error => {
				this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  error.json().error.message);
		        console.log(JSON.stringify(error.json()));
		    });
		}    

	}
}
