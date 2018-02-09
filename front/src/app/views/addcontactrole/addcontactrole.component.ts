import { Component } from '@angular/core';
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

@Component({
  templateUrl: 'addcontactrole.component.html'
})

@Injectable()
export class AddcontactroleComponent {

	private data: any;
  	private error: number;
  	private editparam: any;
  	private brandcount: any;

    constructor(private NgxRolesService: NgxRolesService, private NgxPermissionsService: NgxPermissionsService, @Inject(Http) private http: Http, @Inject(Router)private router:Router, private activatedRoute: ActivatedRoute) {
		//console.log(localStorage.getItem('currentUserRoleId'));
/* 			
	    if(localStorage.getItem('currentUserRoleId') == "1"){
	      localStorage.setItem('currentUserRole', "ADMIN");
	    } else if(localStorage.getItem('currentUserRoleId') == "2"){
	      localStorage.setItem('currentUserRole', "TRAINER");
	    } else if(localStorage.getItem('currentUserRoleId') == "3"){
	      localStorage.setItem('currentUserRole', "REGIONAL");
	    } else if(localStorage.getItem('currentUserRoleId') == "4"){
	      localStorage.setItem('currentUserRole', "ACCOUNT");
	    } */

	  /*   this.NgxRolesService.flushRoles();

	   if(localStorage.getItem('currentUserRole') != null) { 
	   	this.NgxRolesService.addRole(localStorage.getItem('currentUserRole'), ['A'] );
	   } else {
	   	this.NgxRolesService.addRole("GUEST", ['A'] );	   
	   } */

	  /*   let roles = NgxRolesService.getRoles();
	    NgxRolesService.roles$.subscribe((data) => {
	        console.log(data);
	    }) */
		
		this.brandcount = '';
		
		let today:any = new Date();
		let dd:any = today.getDate();
		let mm:any = today.getMonth()+1; //January is 0!
		let yyyy:any = today.getFullYear();

		if(dd<10) {
			dd = '0'+dd
		} 

		if(mm<10) {
			mm = '0'+mm
		} 

		today = mm + '-' + dd + '-' + yyyy;

		let options = new RequestOptions();
	        options.headers = new Headers();
	        options.headers.append('Content-Type', 'application/json');
	        options.headers.append('Accept', 'application/json');
			
		/* 	this.http.get(API_URL+'/Brands/count/?access_token='+ localStorage.getItem('currentUserToken'), options)
	        .subscribe(brands_response => {
	            this.brandcount = brands_response.json();
				console.log(this.brandcount);
				console.log('1');
		    }, error => {
		        console.log(JSON.stringify(error.json()));
		    });
			
			this.http.get(API_URL+'/Centers/count/?access_token='+ localStorage.getItem('currentUserToken'), options)
	        .subscribe(centers_response => {
	          console.log(centers_response.json());
			  console.log('2');
		    }, error => {
		        console.log(JSON.stringify(error.json()));
		    });
			
			
			this.http.get(API_URL+'/MRs/count/?access_token='+ localStorage.getItem('currentUserToken'), options)
	        .subscribe(mr_response => {
				console.log(mr_response.json());
				console.log('3');
	           // this.brandcount = mr_response.json();
				//console.log(this.brandcount);
		    }, error => {
		        console.log(JSON.stringify(error.json()));
		    });
			console.log('4');
			console.log(this.brandcount); */
    	this.data = {    		
    		name:'',
    
    		created_by:localStorage.getItem('currentUser'),
    		created_on:today,

    		/* phone:'',
    		role_id:'',
    		languages:'',
    		username:'',
    		password:'',
    		confirmpassword:'' */
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

	    	this.http.get(API_URL+'/ContactPersonRoles/'+ this.editparam.id +'?access_token='+ localStorage.getItem('currentUserToken'), options)
	        .subscribe(response => {
	        	//console.log(response.json());	
	        	this.data = response.json();
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
			console.log(this.data);
			this.http.post(API_URL+'/ContactPersonRoles?access_token='+localStorage.getItem('currentUserToken'), this.data,  options)
			.subscribe(response => {
				console.log(response.json());		
				this.router.navigate(['contactrole']);  			
				   
			}, error => {
				console.log(JSON.stringify(error.json()));
			});
			
		} else {
			//console.log(this.data);
			let where = '{"id": this.editparam.id}';
			//console.log(where);

			this.http.post(API_URL+'/ContactPersonRoles/update?where=%7B%22id%22%3A%22'+  this.editparam.id +'%22%7D&access_token='+ localStorage.getItem('currentUserToken'), this.data,  options)
	        .subscribe(response => {
	        	console.log(response.json());			
			    this.router.navigate(['contactrole']);  
		    }, error => {
		        console.log(JSON.stringify(error.json()));
		    });
		}    

	}

}
