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
	public data:any;
	private users: any;
	private use_url: any;
	private artists_requests : any;
	private salon_requests : any;
	private salon_registered : Number;
	private artists_registered : Number;
	private where_condition : any;
	private notification_number : number;
	private showNotification : boolean;
	constructor(private NgxRolesService: NgxRolesService, private NgxPermissionsService: NgxPermissionsService, private router:Router, private http: Http) {
		this.showNotification = true;
		this.data = {};
		this.where_condition = {
       'artistRequests' : '{"where":{"role_id":2, "status" : "inactive" , "seen" : false}}',
       'artistRegistered' : '{"where":{"role_id":2, "status" : "active" }}',
       'salonRequests' : '{"where":{"role_id":3, "status" : "inactive" , "seen" : false}}',
       'salonRegistered' : '{"where":{"role_id":3, "status" : "active" }}',
    }
    this.notification_number = 0;
    let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        this.use_url = API_URL+'/Members?filter='+this.where_condition.artistRequests+'&access_token='+localStorage.getItem('currentUserToken');
        this.http.get(this.use_url, options)
        .subscribe(response => {       
            this.artists_requests = response.json().length;
            this.notification_number =  this.notification_number + parseInt(this.artists_requests);       
        }, error => {
            console.log(JSON.stringify(error.json()));
        }); 

        this.use_url = API_URL+'/Members?filter='+this.where_condition.artistRegistered+'&access_token='+localStorage.getItem('currentUserToken');
        this.http.get(this.use_url, options)
        .subscribe(response => {      
            this.artists_registered = response.json().length;
        }, error => {
            console.log(JSON.stringify(error.json()));
        });


        
        this.use_url = API_URL+'/Members?filter='+this.where_condition.salonRequests+'&access_token='+localStorage.getItem('currentUserToken');
         this.http.get(this.use_url, options)
        .subscribe(response => {     
            this.salon_requests = response.json().length;
            this.notification_number =  this.notification_number + parseInt(this.salon_requests);
        }, error => {
            console.log(JSON.stringify(error.json()));
        });



        this.use_url = API_URL+'/Members?filter='+this.where_condition.salonRegistered+'&access_token='+localStorage.getItem('currentUserToken');
         this.http.get(this.use_url, options)
        .subscribe(response => {     
            this.salon_registered = response.json().length;
        }, error => {
            console.log(JSON.stringify(error.json()));
        }); 

        if(this.notification_number) {
        	this.showNotification = true;
        }
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

        let routenavigate:any;
        if(localStorage.getItem('currentUserRoleId') == "1") {
            routenavigate = "admin"
        } else if(localStorage.getItem('currentUserRoleId') == "2") {
            routenavigate = "artist"
        }

		localStorage.clear();
	    this.NgxRolesService.flushRoles();

	    this.router.navigate([routenavigate]);
	}

	removeNotification() {
		this.showNotification = false;
		return false;
	}

 }
