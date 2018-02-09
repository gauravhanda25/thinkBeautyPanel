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


// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

import { TextMaskModule } from 'angular2-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';

// Toastr
import { ToasterModule, ToasterService, ToasterConfig }  from 'angular2-toaster/angular2-toaster';

@Component({
  templateUrl: 'addadvertisingagency.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
})

@Injectable()
export class AddadvertisingagencyComponent {

	private data: any;
  	private error: number;
  	private editparam: any;
	private countries:any;
  	private provinces:any;
	private noofcontacts:any;
	private contactdata: any;
	public emailmask = emailMask;
	private toasterService: ToasterService;
	public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
	  public toasterconfig : ToasterConfig =
	  new ToasterConfig({
		tapToDismiss: true,
		timeout: 5000
	  });
    constructor(private NgxRolesService: NgxRolesService, private NgxPermissionsService: NgxPermissionsService, @Inject(Http) private http: Http, @Inject(Router)private router:Router, private activatedRoute: ActivatedRoute,toasterService: ToasterService) {
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
		this.toasterService = toasterService;
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

		today = dd + '/' + mm + '/' + yyyy;
		
		
    	this.data = {    		
    		name:'',
    		//description:'',
    		created_by:localStorage.getItem('currentUser'),
    		created_on:today,
			country:'',
    		state:'',
    		city:'',
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
		
		this.noofcontacts = [1];

    	this.activatedRoute.params.subscribe((params) => {
	        let id = params['id'];
	        this.editparam.id = id;
	    });
		
		
		this.contactdata = {
    		memberId:'',
    		contactperson:[],
    		contactemail: [],
    		contactphone: [],
    		primarycontact: []    		
    	}
		 this.primary = {
        disable: [0]
      }
		
		this.http.get(API_URL+'/Countries?access_token='+ localStorage.getItem('currentUserToken'), options)
			.subscribe(response => {
				console.log(response.json());	
				this.countries = response.json();
			}, error => {
				console.log(JSON.stringify(error.json()));
			});
			
	    if(this.editparam.id != undefined) {
	    	let options = new RequestOptions();
	        options.headers = new Headers();
	        options.headers.append('Content-Type', 'application/json');
	        options.headers.append('Accept', 'application/json');

	    	this.http.get(API_URL+'/agencies/'+ this.editparam.id +'?access_token='+ localStorage.getItem('currentUserToken'), options)
	        .subscribe(response => {
	        	console.log(response.json());	
	        	this.data = response.json();
	        	this.editparam.action = "edit";
		    }, error => {
		        console.log(JSON.stringify(error.json()));
		    });
			
			
		
			  this.http.get(API_URL+'/AgencyContacts/?filter=%7B%22where%22%3A%7B%22or%22%3A%5B%7B%22advertisingAgencyId%22%3A%22'+this.editparam.id+'%22%7D%5D%7D%7D&access_token='+ localStorage.getItem('currentUserToken'), options)
	        .subscribe(response => {
	        	console.log(response.json());	

	        	if(response.json().length != 0) {
		        	this.contactdata.id = [];
		        	for(let res in response.json()){
		        		this.contactdata.id.push(response.json()[res].id);
		        		this.contactdata.advertisingAgencyId = response.json()[res].advertisingAgencyId;
		        		this.contactdata.contactperson.push(response.json()[res].contactperson);
		        		this.contactdata.contactemail.push(response.json()[res].contactemail);
		        		this.contactdata.contactphone.push(response.json()[res].contactphone);
		        		this.contactdata.primarycontact.push(response.json()[res].primarycontact);
		        	}

		        	this.noofcontacts = [];

		        	for(let i=1; i<= response.json().length; i++ )
		        		this.noofcontacts.push(i);

		       	}
	        	this.editparam.action = "edit";
		    }, error => {
		        console.log(JSON.stringify(error.json()));
		    });
	    }


  	}
	
	 saveContacts(){
		console.log(this.contactdata);

		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');	

		for(let key in this.contactdata.contactperson){
			console.log(this.contactdata.contactperson[key]);

			this.val = {
				memberId: this.contactdata.memberId,
				contactperson: this.contactdata.contactperson[key],
				contactemail: this.contactdata.contactemail[key],
				contactphone: this.contactdata.contactphone[key],
				primarycontact: this.contactdata.primarycontact[key]
			}

			this.http.post(API_URL+'/AgencyContacts?access_token='+localStorage.getItem('currentUserToken'), this.val,  options)
	        .subscribe(response => {
	        	console.log(response.json().id);

	        }, error => {
		        console.log(JSON.stringify(error.json()));
		    });
		 }
	}

	 updateContacts(){
		console.log(this.contactdata);

		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');	

		this.http.delete(API_URL+'/agencies/'+this.editparam.id+'/agencycontacts?access_token='+localStorage.getItem('currentUserToken'), options)
		.subscribe(response => {
		
			for(let key in this.contactdata.contactperson){
				console.log(this.contactdata.contactperson[key]);

				this.val = {
					advertisingAgencyId: this.editparam.id,
					contactperson: this.contactdata.contactperson[key],
					contactemail: this.contactdata.contactemail[key],
					contactphone: this.contactdata.contactphone[key],
					primarycontact: this.contactdata.primarycontact[key]
				}

				this.http.post(API_URL+'/AgencyContacts?access_token='+localStorage.getItem('currentUserToken'), this.val,  options)
				.subscribe(response => {
					console.log(response.json().id);
					this.toasterService.pop('success', 'Success ', "Agency Contacts updated successfully.");	

				}, error => {
					this.toasterService.pop('error', 'Error ',  error.json().error.message);
					console.log(JSON.stringify(error.json()));
				});
			 }
		}, error => {
			this.toasterService.pop('error', 'Error ',  error.json().error.message);
			console.log(JSON.stringify(error.json()));
		}); 

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
	
	 addMoreContact(){
  		this.primary.disable.push(0);
		this.noofcontacts.push(this.noofcontacts.length + 1);

		  for(let i=0; i<this.noofcontacts.length; i++){
			if(this.contactdata.primarycontact[i] == "yes") {
			  this.primary.disable[(this.noofcontacts.length-1)] = 1;
			  console.log((this.noofcontacts.length-1));
			} 
		  }

  		console.log(this.primary);
  	} 

  	 removeContact(removeVal){
  		if(this.noofcontacts.length != 1){
  			var index = this.noofcontacts.indexOf(removeVal);
  			if (index >= 0) {
  			  this.noofcontacts.splice( index, 1 );

          if(this.contactdata.primarycontact[index] == "yes") {
            for(let i=0; i<this.noofcontacts.length; i++){              
              this.primary.disable[i] = 0;
            }
          }

  			  delete (this.contactdata.contactperson[index]);
  			  delete (this.contactdata.contactemail[index]);
  			  delete (this.contactdata.contactrole[index]);
  			  delete (this.contactdata.primarycontact[index]);
          delete (this.primary.disable[index]);

  			}
  		} else {

  		}
  		console.log(this.noofcontacts);
  	}
	primaryOnlyOne(key){
      if(this.contactdata.primarycontact[key] == "yes"){
        for(let i=0; i<this.noofcontacts.length; i++){
          if(i!=key) {
            console.log(i);
            this.primary.disable[i] = 1;
          } else {
            this.primary.disable[i] = 0;          
          }
        }
      } else {
        let flag = 0;
        for(let i=0; i<this.noofcontacts.length; i++){
          if(this.contactdata.primarycontact[i] == "yes") {
            flag = 1;
          } 
        } 

        if(flag == 0){
          for(let i=0; i<this.noofcontacts.length; i++){ 
            this.primary.disable[i] = 0;
          } 
        }
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
			this.http.post(API_URL+'/agencies?access_token='+localStorage.getItem('currentUserToken'), this.data,  options)
			.subscribe(response => {
				console.log(response.json());
				this.router.navigate(['editadvertisingagency/'+response.json().id]);		
				//this.router.navigate(['auto-group']);  			
				   
			}, error => {
				console.log(JSON.stringify(error.json()));
			});
			
		} else {
			console.log(this.data);
			let where = '{"id": this.editparam.id}';
			console.log(where);

			this.http.post(API_URL+'/agencies/update?where=%7B%22id%22%3A%22'+  this.editparam.id +'%22%7D&access_token='+ localStorage.getItem('currentUserToken'), this.data,  options)
	        .subscribe(response => {
	        	console.log(response.json());			
				this.router.navigate(['editadvertisingagency/'+response.json().id]);
			   // this.router.navigate(['auto-group']);  
		    }, error => {
		        console.log(JSON.stringify(error.json()));
		    });
		}    

	}

}
