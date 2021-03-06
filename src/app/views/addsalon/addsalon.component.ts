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

import { TextMaskModule } from 'angular2-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';

// Toastr
import { ToasterModule, ToasterService, ToasterConfig }  from 'angular2-toaster/angular2-toaster';

@Component({
  templateUrl: 'addsalon.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})

@Injectable()
export class AddsalonComponent {

	private data: any;
  	private error: number;
  	private editparam: any;
  	private countries: any;
  	private provinces: any;
  	public mask = [/[1-9]/, /\d/, /\d/, ' ',/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  	public emailmask = emailMask;

  	private toasterService: ToasterService;

    public toasterconfig : ToasterConfig =
      new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
      });

    constructor(private NgxRolesService: NgxRolesService, private NgxPermissionsService: NgxPermissionsService, @Inject(Http) private http: Http, @Inject(Router)private router:Router, private activatedRoute: ActivatedRoute, toasterService: ToasterService ) {

	    if(localStorage.getItem('currentUserRoleId') == "1"){
	      localStorage.setItem('currentUserRole', "ADMIN");
	    } else if(localStorage.getItem('currentUserRoleId') == "2"){
	      localStorage.setItem('currentUserRole', "ARTIST");
	    } else if(localStorage.getItem('currentUserRoleId') == "3"){
	      localStorage.setItem('currentUserRole', "SALON");
	    } 

        this.toasterService = toasterService;

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

    	this.data = {    		
    		name:'',
    		email:'',
    		country:'',
    		block:'',
    		phone:'',
    		role_id: 3,
    		contact_person_name:'',
    		contact_person_mobile:'',
    		villa:'',
    		road:'',
    		city:'',
    		cpr:'',
    		password:'',
    		emailVerified: false,
    		status: 'active',
    		created_on: today
    	}

    	let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

    	this.http.get(API_URL+'/Countries?filter={"order":"name ASC"}&access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	console.log(response.json());	
        	this.countries = response.json();
	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });


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

	    	this.http.get(API_URL+'/Members/'+ this.editparam.id +'?access_token='+ localStorage.getItem('currentUserToken'), options)
	        .subscribe(response => {
	        	console.log(response.json());	
	        	this.data = response.json();
	        
	        	this.onChangeCountry();

	        	this.editparam.action = "edit";
		    }, error => {
		        console.log(JSON.stringify(error.json()));
		    });
	    }
		
  	}  	

	randomPassword(length) {
	    let chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
	    let pass = "";
	    for (let x = 0; x < length; x++) {
	        let i = Math.floor(Math.random() * chars.length);
	        pass += chars.charAt(i);
	    }
	    return pass;
	}

	onChangeCountry(){
		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
		
  		this.http.get(API_URL+'/Countries/'+this.data.country+'/provinces?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	console.log(response.json());	
        	this.provinces = response.json();
	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });
	}

	onSubmit() {
		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
		
		console.log(this.editparam.id);

		this.data.role_id = parseInt(this.data.role_id);
		
		if(this.editparam.id  == undefined){
			if(this.data.password == '') {
				this.data.password = this.randomPassword(8);
			}

			this.http.post(API_URL+'/Members?access_token='+localStorage.getItem('currentUserToken'), this.data,  options)
	        .subscribe(response => {
	        	console.log(response.json());   
    			localStorage.setItem('noticemessage', 'salonadd');
		   		this.router.navigate(['managesalon/registered']);  			
			       
		    }, error => {
                if(error.json().error.statusCode == "422") {
                	this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  "Email Address already exists. Please use different email");
                	this.error = 1;
		    	} else {
                	this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  error.json().error.message);
		    	}
		        console.log(JSON.stringify(error.json()));
		    });
			
		} else {

			if(this.data.password == '') {
				delete(this.data.password);
			}
			console.log(this.data);
			let where = '{"id": this.editparam.id}';
			console.log(where);

			this.http.post(API_URL+'/Members/update?where=%7B%22id%22%3A%22'+  this.editparam.id +'%22%7D&access_token='+ localStorage.getItem('currentUserToken'), this.data,  options)
	        .subscribe(response => {
	        	console.log(response.json());	
    			localStorage.setItem('noticemessage', 'salonupdate');
    			this.router.navigate(['managesalon/registered']);  
               	
		    }, error => {
                if(error.json().error.statusCode == "422") {
                	this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  "Email Address already exists. Please use different email");
                	this.error = 1;
		    	} else {
                	this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  error.json().error.message);
		    	}
		        console.log(JSON.stringify(error.json()));
		    });
		}    

	}

}
