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

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ModalDirective } from 'ngx-bootstrap/modal';

// Toastr
import { ToasterModule, ToasterService, ToasterConfig, Toast }  from 'angular2-toaster/angular2-toaster';

@Component({
	templateUrl: 'artistservices.component.html',
	styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
	encapsulation: ViewEncapsulation.None
})

@Injectable()
export class ArtistservicesComponent {

	private makeupservices: any;
	private makeupservicesData:any;
	private makeup:any = [];
	private nomakeup:any = 0;
	
	private nailservices: any;
	private nailservicesData:any;
	private nails:any = [];
	private nonail:any = 0;

	private hairservices: any;
	private hairservicesData:any;
	private hair:any = [];
	private nohair:any = 0;

	private data: any;
  	private editparam: any;


	private coursesData:any;
	private nocourses:any = 0;

	private toasterService: ToasterService;
	public toasterconfig : ToasterConfig =
	  new ToasterConfig({
		tapToDismiss: true,
		timeout: 1000
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
		
    	this.data = {    		
    		price:'',
    		duration: '',
    		artistId: localStorage.getItem('currentUserId'),
    		serviceId: '',
    		subserviceId: ''
    	}

    	this.getAllArtistData();
    	this.getAllArtistCourseData();


  	}

  	getAllArtistCourseData(){
  		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        this.http.get(API_URL+'/Artistcourses?filter={"where":{"and":[{"artistId":"'+localStorage.getItem('currentUserId')+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(r => {
        	if(r.json().length != 0){
        		this.coursesData = r.json();
        		this.nocourses = 1;
        	} else {
        		this.coursesData = '';
        	}

        	console.log(this.coursesData);
	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });
  	}

  	getAllArtistData(){
  		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

    	this.http.get(API_URL+'/Makeups?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	this.makeupservices = response.json();
        	console.log(response.json());
        	this.makeupservicesData = [];

        	let removedata:any = 0;

        	for(let ser in response.json()) {
	        	this.http.get(API_URL+'/Artistservices?filter={"where":{"and":[{"subserviceId":"'+response.json()[parseInt(ser)-removedata].id+'"},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
		        .subscribe(r => {
		        	if(r.json().length != 0) {
		        		this.makeupservicesData[response.json()[parseInt(ser)-removedata].id] = r.json()[0];
		        		this.makeup.push(this.makeupservices[parseInt(ser)-removedata]);
		        		this.nomakeup = 1;
		        	} else if(r.json().length == 0){
		        		this.makeupservicesData[response.json()[parseInt(ser)-removedata].id] = '';
		        		delete this.makeupservices[parseInt(ser)-removedata];
		        	}

			    }, error => {
			        console.log(JSON.stringify(error.json()));
			    });
			}


	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });

	    this.http.get(API_URL+'/Nails?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	//console.log(response.json());	
        	this.nailservices = response.json();

        	this.nailservicesData = [];


        	let removedata:any = 0;

        	for(let ser in response.json()) {
	        	this.http.get(API_URL+'/Artistservices?filter={"where":{"and":[{"subserviceId":"'+response.json()[parseInt(ser)-removedata].id+ '"},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
		        .subscribe(r => {
		        	if(r.json().length != 0){
		        		this.nailservicesData[response.json()[parseInt(ser)-removedata].id] = r.json()[0];        		
		        		this.nails.push(this.nailservices[parseInt(ser)-removedata]);
		        		this.nonail = 1;
		        	} else if(r.json().length == 0){
		        		this.nailservicesData[response.json()[parseInt(ser)-removedata].id] = '';
		        		delete this.nailservices[parseInt(ser)-removedata];
		        	}
			    }, error => {
			        console.log(JSON.stringify(error.json()));

			    });
			}


	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });

	    this.http.get(API_URL+'/Hairs?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	//console.log(response.json());	
        	this.hairservices = response.json();

        	this.hairservicesData = [];

        	let removedata:any = 0;

        	for(let ser in response.json()) {
	        	this.http.get(API_URL+'/Artistservices?filter={"where":{"and":[{"subserviceId":"'+response.json()[parseInt(ser)-removedata].id+ '"},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
		        .subscribe(r => {
		        	if(r.json().length != 0){
		        		this.hairservicesData[response.json()[parseInt(ser)-removedata].id] = r.json()[0];
		        		this.hair.push(this.hairservices[parseInt(ser)-removedata]);
		        		this.nohair = 1;
		        	} else if(r.json().length == 0){
		        		this.hairservicesData[response.json()[parseInt(ser)-removedata].id] = '';
		        		delete this.hairservices[parseInt(ser)-removedata];
		        	}
			    }, error => {
			        console.log(JSON.stringify(error.json()));
			    });
			}
	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });

  	}

}
