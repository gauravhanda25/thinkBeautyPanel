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
import {IOption} from 'ng-select';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

import { TextMaskModule } from 'angular2-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';

// Ng2-file-upload
import { FileSelectDirective, FileDropDirective, FileUploadModule, FileUploader } from 'ng2-file-upload';

// Toastr
import { ToasterModule, ToasterService, ToasterConfig }  from 'angular2-toaster/angular2-toaster';

@Component({
  templateUrl: 'adddealer.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss', '../../../scss/vendors/ng-select/ng-select.scss',  '../../../scss/vendors/bs-datepicker/bs-datepicker.scss'],
  encapsulation: ViewEncapsulation.None
})


@Injectable()
export class AdddealerComponent {

	private data: any;
  	private error: number;
  	private editparam: any;
  	private notsamebilladdr: number;
  	public userdata: any;
  	private contactdata: any;
    private eventdata: any;
  	private filesdata: any;
  	private containerdata: any;
  	private addressdata: any;
  	private settingsdata: any;
  	private oems:any;
  	private brands:any;
  	private centers:any;
  	private mrs:any;
  	private autogrps:any;
  	private noofcontacts:any;
    private noofevents:any;
  	private countries:any;
  	private provinces:any;
  	private billcountries:any;
  	private billprovinces:any;
    private trainers:any;
    private primary:any;
    private datacontact:any;
    public oembrands: Array<IOption>;

    public uploader:FileUploader;
    public files:any;

    // Datepicker
    public bsStartValue = [ new Date()];
    public bsEndValue = [ new Date()];

  	private key:any;
  	private val:any;
  	
  	public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  	public emailmask = emailMask;

  	private toasterService: ToasterService;

    public toasterconfig : ToasterConfig =
      new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
      });


    constructor(private NgxRolesService: NgxRolesService, private NgxPermissionsService: NgxPermissionsService, @Inject(Http) private http: Http, @Inject(Router)private router:Router, private activatedRoute: ActivatedRoute, toasterService: ToasterService) {

	    if(localStorage.getItem('currentUserRoleId') == "1"){
	      localStorage.setItem('currentUserRole', "ADMIN");
	    } else if(localStorage.getItem('currentUserRoleId') == "2"){
	      localStorage.setItem('currentUserRole', "TRAINER");
	    } else if(localStorage.getItem('currentUserRoleId') == "3"){
	      localStorage.setItem('currentUserRole', "REGIONAL");
	    } else if(localStorage.getItem('currentUserRoleId') == "4"){
	      localStorage.setItem('currentUserRole', "ACCOUNT");
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

    	this.userdata = {
    		name:'',
    		phone:'',
    		email:'',
    		website:'',
    		dealerno:'',
    		salesrepno:'',
    		groupsize:'',
    		marketingno:'',
    		saleslocal:'',
    		kitdropdays:'',
    		oem: '',
    		brand: [],
    		center: '',
    		mr: '',
    		autogrp: '',

    		role_id: 5,

    		username:'',
    		password:''
		}
			

		this.addressdata= {
    		memberId:'',
    		address:'',
    		country:'',
    		province:'',
    		city:'',
    		postalcode:'',
    		samebilladdr: 'yes',
    		billaddress:'',
    		billcountry:'',
    		billprovince:'',
    		billcity:'',
    		billpostalcode:''			
    	}


    	this.filesdata = {
    		file:''
    	}

    	this.containerdata = {
    		name: this.userdata.username
    	}

      this.eventdata = {
        memberId:'',
        eventname:[],
        description: [],
        trainer: [''],
        eventstart: [] ,
        eventend: []         
      }


    	this.contactdata = {
    		memberId:'',
    		contactperson:[],
    		contactemail: [],
    		contactrole: [],
    		primarycontact: [] ,
        datacontact: []     		
    	}

      this.primary = {
        disable: [0]
      }

      this.datacontact = {
        disable: [0]
      }

    	this.notsamebilladdr = 0;

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

	    this.http.get(API_URL+'/AutoGroups?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	console.log(response.json());	
        	this.autogrps = response.json();
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

	    this.http.get(API_URL+'/Countries?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	console.log(response.json());	
        	this.billcountries = response.json();
	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });

      this.http.get(API_URL+'/Members?filter=%7B%22where%22%3A%7B%22or%22%3A%5B%7B%22role_id%22%3A2%7D%5D%7D%7D&access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
          console.log(response.json()); 
          this.trainers = response.json();
      }, error => {
          console.log(JSON.stringify(error.json()));
      });


    	this.editparam = {
    		id: '',
    		action: 'add'
    	}

    	this.noofcontacts = [1];

      this.noofevents = [1];

    	this.activatedRoute.params.subscribe((params) => {
	        let id = params['id'];
	        this.editparam.id = id;
	    });

      this.uploader = new FileUploader({url: API_URL+'/Containers/'+ this.editparam.id +'/upload?access_token='+localStorage.getItem('currentUserToken')});

	    if(this.editparam.id != undefined) {

	    	let options = new RequestOptions();
	        options.headers = new Headers();
	        options.headers.append('Content-Type', 'application/json');
	        options.headers.append('Accept', 'application/json');

	    	this.http.get(API_URL+'/Members/'+ this.editparam.id +'?access_token='+ localStorage.getItem('currentUserToken'), options)
	        .subscribe(response => {
	        	console.log(response.json());	
	        	this.userdata = response.json();
	        	this.editparam.action = "edit";


            // ng2-select
         //   for(let i=0; i< response.json().length; i++) {            
         //     this.brands.push({label: response.json()[i].name, value: response.json()[i].id});
         //  }

		    	this.onChangeOEM();
		    	this.onChangeBrand();
		    	this.onChangeBusinessCenter();
		    }, error => {
		        console.log(JSON.stringify(error.json()));
		    });


		    this.http.get(API_URL+'/contacts/?filter=%7B%22where%22%3A%7B%22or%22%3A%5B%7B%22memberId%22%3A%22'+this.editparam.id+'%22%7D%5D%7D%7D&access_token='+ localStorage.getItem('currentUserToken'), options)
	        .subscribe(response => {
	        	console.log(response.json());	

	        	if(response.json().length != 0) {
		        	this.contactdata.id = [];
		        	for(let res in response.json()){
		        		this.contactdata.id.push(response.json()[res].id);
		        		this.contactdata.memberId = response.json()[res].memberId;
		        		this.contactdata.contactperson.push(response.json()[res].contactperson);
		        		this.contactdata.contactemail.push(response.json()[res].contactemail);
		        		this.contactdata.contactrole.push(response.json()[res].contactrole);
		        		this.contactdata.primarycontact.push(response.json()[res].primarycontact);
                this.contactdata.datacontact.push(response.json()[res].datacontact);
		        	}

		        	this.noofcontacts = [];

		        	for(let i=1; i<= response.json().length; i++ )
		        		this.noofcontacts.push(i);

		       	}
	        	this.editparam.action = "edit";
		    }, error => {
		        console.log(JSON.stringify(error.json()));
		    });

        this.http.get(API_URL+'/Events/?filter=%7B%22where%22%3A%7B%22or%22%3A%5B%7B%22memberId%22%3A%22'+this.editparam.id+'%22%7D%5D%7D%7D&access_token='+ localStorage.getItem('currentUserToken'), options)
          .subscribe(response => {
            console.log(response.json()); 

            if(response.json().length != 0) {
              this.eventdata.id = [];
              for(let res in response.json()){
                this.eventdata.id.push(response.json()[res].id);
                this.eventdata.memberId = response.json()[res].memberId;
                this.eventdata.eventname.push(response.json()[res].eventname);
                this.eventdata.description.push(response.json()[res].description);
                this.eventdata.trainer.push(response.json()[res].trainer);
                this.eventdata.eventstart.push(response.json()[res].eventstart);
                this.eventdata.eventend.push(response.json()[res].eventend);
              }

              this.noofevents = [];

              for(let i=1; i<= response.json().length; i++ )
                this.noofevents.push(i);

            }
            this.editparam.action = "edit";
        }, error => {
            console.log(JSON.stringify(error.json()));
        });


        this.http.get(API_URL+'/Containers/'+this.editparam.id+'/files?access_token='+ localStorage.getItem('currentUserToken'), options)
          .subscribe(response => {
            console.log(response.json());
            if(response.json().length != 0){
                this.files = response.json();
            } 
            this.editparam.action = "edit";
        }, error => {
            console.log(JSON.stringify(error.json()));
        });


		    this.http.get(API_URL+'/addresses/?filter=%7B%22where%22%3A%7B%22or%22%3A%5B%7B%22memberId%22%3A%22'+this.editparam.id+'%22%7D%5D%7D%7D&access_token='+ localStorage.getItem('currentUserToken'), options)
	        .subscribe(response => {
	        	console.log(response.json());
	        	if(response.json().length != 0){
	        		this.addressdata = response.json()[0];
  					delete this.addressdata.id;

			    	this.onChangeBillAddr();
			    	this.onChangeCountry();
			    	this.onChangeBillCountry();
	        	}	
	        	this.editparam.action = "edit";
		    }, error => {
		        console.log(JSON.stringify(error.json()));
		    });


        if(localStorage.getItem('noticemessage') != null ){
          console.log(localStorage.getItem('noticemessage'));

          if(localStorage.getItem('noticemessage') == "dealeradd") {
              alert("Dealer Profile added successfully.");
             // this.toasterService.pop('success', 'Success ', "Dealer Profile added successfully."); 
          } 

          localStorage.setItem('noticemessage', null);
        }
	    }    	      
  	}

    addMoreEvent(){
      this.eventdata.trainer.push('');
      this.noofevents.push(this.noofevents.length + 1);   //to correct
    }

    removeEvent(removeVal){
      if(this.noofevents.length != 1){
        var index = this.noofevents.indexOf(removeVal);
        if (index >= 0) {
          this.noofevents.splice( index, 1 );
          delete (this.eventdata.eventname[index]);
          delete (this.eventdata.description[index]);
          delete (this.eventdata.trainer[index]);
          delete (this.eventdata.eventstart[index]);
          delete (this.eventdata.eventend[index]);

        }
      } else {

      }
      console.log(this.noofevents);
    }



  	addMoreContact(){
      this.primary.disable.push(0);
      this.datacontact.disable.push(0);
		  this.noofcontacts.push(this.noofcontacts.length + 1); //to correct

      for(let i=0; i<this.noofcontacts.length; i++){
        if(this.contactdata.primarycontact[i] == "yes") {
          this.primary.disable[(this.noofcontacts.length-1)] = 1;
          console.log((this.noofcontacts.length-1));
        } 
      }

      for(let i=0; i<this.noofcontacts.length; i++){
        if(this.contactdata.datacontact[i] == "yes") {
          this.datacontact.disable[(this.noofcontacts.length-1)] = 1;
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

          if(this.contactdata.datacontact[index] == "yes") {
            for(let i=0; i<this.noofcontacts.length; i++){              
              this.datacontact.disable[i] = 0;
            }
          }

  			  delete (this.contactdata.contactperson[index]);
  			  delete (this.contactdata.contactemail[index]);
  			  delete (this.contactdata.contactrole[index]);
  			  delete (this.contactdata.primarycontact[index]);
          delete (this.contactdata.datacontact[index]);
          delete (this.primary.disable[index]);
          delete (this.contactdata.disable[index]);

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

    dataContactOnlyOne(key){  
      if(this.contactdata.datacontact[key] == "yes"){
        for(let i=0; i<this.noofcontacts.length; i++){
          if(i!=key) {
            console.log(i);
            this.datacontact.disable[i] = 1;
          } else {
            this.datacontact.disable[i] = 0;          
          }
        }
      } else {
        let flag = 0;
        for(let i=0; i<this.noofcontacts.length; i++){
          if(this.contactdata.datacontact[i] == "yes") {
            flag = 1;
          } 
        } 

        if(flag == 0){
          for(let i=0; i<this.noofcontacts.length; i++){ 
            this.datacontact.disable[i] = 0;
          } 
        }
      }
    }


  	onChangeBillAddr(){
  		if(this.addressdata.samebilladdr == "yes" ){
  			this.notsamebilladdr = 0;
  			this.addressdata.address = this.addressdata.billaddress;
  			this.addressdata.country = this.addressdata.billcountry;
  			this.addressdata.province = this.addressdata.billprovince;
  			this.addressdata.city = this.addressdata.billcity;
  			this.addressdata.postalcode = this.addressdata.billpostalcode;
  			console.log(this.addressdata);
  		} else if(this.addressdata.samebilladdr == "no"){
  			this.notsamebilladdr = 1;  	
  			this.addressdata.address = '';
  			this.addressdata.country = '';
  			this.addressdata.province = '';
  			this.addressdata.city = '';
  			this.addressdata.postalcode = '';
  			console.log(this.addressdata);	
  		}
  	}

  	onChangeOEM(){
		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
		    
       this.oembrands = [];
  		this.http.get(API_URL+'/Oems/'+this.userdata.oem+'/brands?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	console.log(response.json());	
        	// this.brands = response.json();

          // ng2-select
          for(let i=0; i< response.json().length; i++) {            
           this.oembrands.push({label: response.json()[i].name, value: response.json()[i].id+'-'+response.json()[i].name});
          }
          this.oembrands = [...this.oembrands];

        	console.log(this.oembrands);
	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });
  	}
  
  	onChangeBrand(){
      // this.userdata.brand = [...this.userdata.brand];
      console.log(this.userdata.brand);

	    let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json');
	
      this.centers = [];

      for(let key in this.userdata.brand){
        let brandarr = (this.userdata.brand[key]).toString().split('-');
    		this.http.get(API_URL+'/Brands/'+brandarr[0]+'/centers?access_token='+ localStorage.getItem('currentUserToken'), options)
          .subscribe(response => {
          	console.log(response.json());	

            for(let i=0; i<response.json().length; i++) {
          	  this.centers.push({id: response.json()[i].id, brandId: response.json()[i].brandId, name: response.json()[i].name, brandName: brandarr[1]});
            }
  	    }, error => {
  	        console.log(JSON.stringify(error.json()));
  	    });
      }
      console.log( this.centers);
  	}

  	onChangeBusinessCenter(){
		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
		
  		this.http.get(API_URL+'/Centers/'+this.userdata.center+'/mrs?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	console.log(response.json());	
        	this.mrs = response.json();
	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });
  	}

	onChangeCountry(){
		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
		
  		this.http.get(API_URL+'/Countries/'+this.addressdata.country+'/provinces?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	console.log(response.json());	
        	this.provinces = response.json();
	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });
	}

	onChangeBillCountry(){
		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
		
  		this.http.get(API_URL+'/Countries/'+this.addressdata.billcountry+'/provinces?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	console.log(response.json());	
        	this.billprovinces = response.json();
	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });
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

	
	saveProfile(){
		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');	

		this.userdata.password = this.randomPassword(8);

		this.userdata.username = (this.userdata.email).substring(0, (this.userdata.email).lastIndexOf("@"));
		console.log(this.userdata.username);

		this.http.post(API_URL+'/Members?access_token='+localStorage.getItem('currentUserToken'), this.userdata,  options)
        .subscribe(response => {
        	console.log(response.json());
        	console.log(response.json().id);

          this.containerdata = {
            name: response.json().id
          }

          this.http.post(API_URL+'/Containers?access_token='+ localStorage.getItem('currentUserToken'), this.containerdata,  options)
          .subscribe(response => {
            console.log(response.json());
          }, error => {
              console.log(JSON.stringify(error.json()));
          });

        	this.filesdata.memberId = response.json().id;
        	this.contactdata.memberId = response.json().id;	
        	this.addressdata.memberId = response.json().id;

        	localStorage.setItem('noticemessage', 'dealeradd');
        	this.router.navigate(['editdealer/'+response.json().id]);
        }, error => {
            this.toasterService.pop('error', 'Error ',  error.json().error.message);
	        console.log(JSON.stringify(error.json()));
	    });
	}

	updateProfile(){
		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');	

        delete this.userdata.username;
        delete this.userdata.password;

		this.http.post(API_URL+'/Members/update?where=%7B%22id%22%3A%22'+  this.editparam.id +'%22%7D&access_token='+ localStorage.getItem('currentUserToken'), this.userdata,  options)
        .subscribe(response => {
        	console.log(response.json());
        	this.toasterService.pop('success', 'Success ', "Dealer Profile updated successfully.");		

	    }, error => {
            this.toasterService.pop('error', 'Error ',  error.json().error.message);
	        console.log(JSON.stringify(error.json()));
	    });
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
				contactrole: this.contactdata.contactrole[key],
				primarycontact: this.contactdata.primarycontact[key],
        datacontact: this.contactdata.datacontact[key]
			}

			this.http.post(API_URL+'/contacts?access_token='+localStorage.getItem('currentUserToken'), this.val,  options)
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


    this.http.delete(API_URL+'/Members/'+this.editparam.id+'/contacts?access_token='+localStorage.getItem('currentUserToken'), options)
    .subscribe(response => {

        for(let key in this.contactdata.contactperson){
          console.log(this.contactdata.contactperson[key]);

          this.val = {
            memberId: this.editparam.id,
            contactperson: this.contactdata.contactperson[key],
            contactemail: this.contactdata.contactemail[key],
            contactrole: this.contactdata.contactrole[key],
            primarycontact: this.contactdata.primarycontact[key],
            datacontact: this.contactdata.datacontact[key]
          }

          this.http.post(API_URL+'/contacts?access_token='+localStorage.getItem('currentUserToken'), this.val,  options)
              .subscribe(response => {
                console.log(response.json().id);
                this.toasterService.pop('success', 'Success ', "Dealer Contacts updated successfully.");  

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

  updateEvents(){
    console.log(this.eventdata);

    let options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('Content-Type', 'application/json');
    options.headers.append('Accept', 'application/json'); 


    this.http.delete(API_URL+'/Members/'+this.editparam.id+'/events?access_token='+localStorage.getItem('currentUserToken'), options)
    .subscribe(response => {

        for(let key in this.eventdata.eventname){
          console.log(this.eventdata.eventname[key]);

          this.val = {
            memberId: this.editparam.id,
            eventname: this.eventdata.eventname[key],
            description: this.eventdata.description[key],
            trainer: this.eventdata.trainer[key],
            eventstart: this.eventdata.eventstart[key],
            eventend: this.eventdata.eventend[key]
          }

          this.http.post(API_URL+'/Events?access_token='+ localStorage.getItem('currentUserToken'), this.val,  options)
              .subscribe(response => {
                console.log(response.json().id);
                this.toasterService.pop('success', 'Success ', "Dealer Events updated successfully.");  

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

	saveSettings(){
		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');	

        if(this.userdata.password == '') {
			this.settingsdata = {
				username: this.userdata.username
			}
		} else {
			this.settingsdata = {
				username: this.userdata.username,
				password: this.userdata.password
			}
		}

		

		this.http.post(API_URL+'/Members/update?where=%7B%22id%22%3A%22'+  this.editparam.id +'%22%7D&access_token='+ localStorage.getItem('currentUserToken'), this.settingsdata,  options)
        .subscribe(response => {
        	console.log(response.json());	
        	this.toasterService.pop('success', 'Success ', "Dealer Settings updated successfully.");		

	    }, error => {
            this.toasterService.pop('error', 'Error ',  error.json().error.message);
	        console.log(JSON.stringify(error.json()));
	    });
	}

	saveUploads(){
		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');	

        this.containerdata = {
        	name: this.userdata.username
        }

        this.http.post(API_URL+'/Containers?access_token='+localStorage.getItem('currentUserToken'), this.containerdata,  options)
        .subscribe(response => {
        	console.log(response.json());
        	
        	this.http.post(API_URL+'/Containers/'+this.containerdata.name+'/upload?access_token='+localStorage.getItem('currentUserToken'), this.filesdata,  options)
	        .subscribe(response => {
	        	console.log(response.json());
        		this.toasterService.pop('success', 'Success ', "Dealer Uploads updated successfully.");
	        	
	        }, error => {
                this.toasterService.pop('error', 'Error ',  "Dealer Uploads not updated successfully.");
		        console.log(JSON.stringify(error.json()));
		    });

        }, error => {
            this.toasterService.pop('error', 'Error ',  error.json().error.message);
	        console.log(JSON.stringify(error.json()));
	    });

		
	}

  removeAttachment(file){
    console.log(file);
     let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json');


    this.http.delete(API_URL+'/Containers/'+ this.editparam.id +'/files/'+  file.name + '?access_token='+localStorage.getItem('currentUserToken'), options)
    .subscribe(response => {
      console.log(response.json());
      this.toasterService.pop('success', 'Success ', "Dealer Uploaded file "+file.name+" deleted successfully.");

      const index: number = this.files.indexOf(file);
      console.log(index);
      if (index !== -1) {
       this.files.splice(index, 1);
      }   
    }, error => {
          this.toasterService.pop('error', 'Error ',  "Dealer Uploaded file "+file.name+" deletion failed.");
        console.log(JSON.stringify(error.json()));
    });

  }


 /*  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
      let file: File = fileList[0];
      console.log(file);
      this.formData = new FormData();
      this.formData.append('uploadFile', file, file.name);
      console.log(this.formData);
    }
  }

  getFiles(event){ 
    this.files = event.target.files; 
    console.log(this.files[0]); 
  } 
  */


	updateUploads(){		
		  let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json');

    /*  container for each dealer created at time of dealer add profile.

    this.containerdata = {
      	name: this.userdata.username
      }

      this.http.post(API_URL+'/Containers?access_token='+localStorage.getItem('currentUserToken'), this.containerdata,  options)
      .subscribe(response => {
      	console.log(response.json());


        uploader = new FileUploader({url: API_URL+'/Containers/'+this.containerdata.name+'/upload?access_token='+localStorage.getItem('currentUserToken')});



     	this.filesdata = {
          file: this.files[0].name
        }

      	console.log(this.files[0]);
      
      console.log(this.formData);


      	this.http.post(API_URL+'/Containers/'+this.containerdata.name+'/upload?access_token='+localStorage.getItem('currentUserToken'), this.formData,  options)
        .subscribe(response => {
        	console.log(response.json());
      		this.toasterService.pop('success', 'Success ', "Dealer Uploads updated successfully.");
        	
        }, error => {
              this.toasterService.pop('error', 'Error ',  "Dealer Uploads not updated successfully.");
  	        console.log(JSON.stringify(error.json()));
  	    });

      }, error => {
          this.toasterService.pop('error', 'Error ',  error.json().error.message);
          console.log(JSON.stringify(error.json()));
      });
*/
	}

	saveAddress(){
		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');	

		this.http.post(API_URL+'/addresses?access_token='+localStorage.getItem('currentUserToken'), this.addressdata,  options)
        .subscribe(response => {
        	console.log(response.json());

        }, error => {
	        console.log(JSON.stringify(error.json()));
	    });
	}

	updateAddress(){
		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');	

        this.addressdata.memberId = this.editparam.id;

		this.http.post(API_URL+'/addresses/upsertWithWhere?where=%7B%22memberId%22%3A%22'+  this.editparam.id+'%22%7D&access_token='+ localStorage.getItem('currentUserToken'), this.addressdata,  options)
        .subscribe(response => {
        	this.toasterService.pop('success', 'Success ', "Dealer Address updated successfully.");
        	console.log(response.json());		

	    }, error => {
            this.toasterService.pop('error', 'Error ',  error.json().error.message);
	        console.log(JSON.stringify(error.json()));
	    });
	}

}
