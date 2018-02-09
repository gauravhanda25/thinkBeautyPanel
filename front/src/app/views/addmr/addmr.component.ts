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
import { TextMaskModule } from 'angular2-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';
// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

@Component({
  templateUrl: 'addmr.component.html'
})

@Injectable()
export class AddmrComponent {

	private data: any;
  	private error: number;
  	private editparam: any;
  	private userdata: any;
  	private contactdata: any;
  	private filesdata: any;
  	private oems:any;
  	private brands:any;
  	private centers:any;
  	private mrs:any;
  	private autogrps:any;
	private countries:any;
  	private provinces:any;
	public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    constructor(private NgxRolesService: NgxRolesService, private NgxPermissionsService: NgxPermissionsService, @Inject(Http) private http: Http, @Inject(Router)private router:Router, private activatedRoute: ActivatedRoute) {

	   /*  if(localStorage.getItem('currentUserRoleId') == "1"){
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
 */
 
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

		today = dd + '-' + mm + '-' + yyyy;
		
		
		
    	this.data = {
    		name:'',
    		description:'',
    		oemId:'',
    		brandId:'',
    		country:'',
    		state:'',
    		city:'',
    		phone_no:'',
    		alternate_phone_no:'',
    		centerId:'',
    		created_by: localStorage.getItem('currentUser'),
    		created_on:today,
    		
    	}



    	let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

    	this.http.get(API_URL+'/Oems?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	console.log(response.json());	
        	this.oems = response.json();
	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });

		this.http.get(API_URL+'/Countries?access_token='+ localStorage.getItem('currentUserToken'), options)
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

	    	this.http.get(API_URL+'/MRs/'+ this.editparam.id +'?access_token='+ localStorage.getItem('currentUserToken'), options)
	        .subscribe(response => {
	        	console.log(response.json());	
	        	this.data = response.json();
				this.onChangeOEM();
				this.onChangeBrand();

	        	this.editparam.action = "edit";
		    }, error => {
		        console.log(JSON.stringify(error.json()));
		    });
	    }    	
  	}

  /* 	addMoreContact(){

  	} */

  	/* onChangeBillAddr(){
  		if(this.userdata.samebilladdr == "yes" || this.userdata.samebilladdr == "" ){
  			this.notsamebilladdr = 0;
  		} else if(this.userdata.samebilladdr == "no"){
  			this.notsamebilladdr = 1;  		
  		}
  	} */

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
	
	
  	onChangeOEM(){
		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
		
  		this.http.get(API_URL+'/Oems/'+this.data.oemId+'/brands?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	console.log(response.json());	
        	this.brands = response.json();
	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });
  	}

  	onChangeBrand(){
		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
		
  		this.http.get(API_URL+'/Brands/'+this.data.brandId+'/centers?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	console.log(response.json());	
        	this.centers = response.json();
	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });
  	}

  	onChangeBusinessCenter(){
		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
		
  		this.http.get(API_URL+'/Centers/'+this.data.center+'/mrs?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	console.log(response.json());	
        	this.mrs = response.json();
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

		if(this.editparam.id  == undefined){
			this.http.post(API_URL+'/MRs?access_token='+localStorage.getItem('currentUserToken'), this.data,  options)
			.subscribe(response => {
				console.log(response.json());		
				this.router.navigate(['mr']);  			
				   
			}, error => {
				console.log(JSON.stringify(error.json()));
			});
			
		} else {
			console.log(this.data);
			let where = '{"id": this.editparam.id}';
			console.log(where);

			this.http.post(API_URL+'/MRs/update?where=%7B%22id%22%3A%22'+  this.editparam.id +'%22%7D&access_token='+ localStorage.getItem('currentUserToken'), this.data,  options)
	        .subscribe(response => {
	        	console.log(response.json());			
			    this.router.navigate(['mr']);  
		    }, error => {
		        console.log(JSON.stringify(error.json()));
		    });
		}    

	}
}
