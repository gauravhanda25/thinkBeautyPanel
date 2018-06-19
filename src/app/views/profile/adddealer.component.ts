import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
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
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import {IOption} from 'ng-select';
import * as moment from 'moment';
import * as $ from 'jquery';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

import { TextMaskModule } from 'angular2-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';

// Ng2-file-upload
import { FileSelectDirective, FileDropDirective, FileUploadModule, FileUploader } from 'ng2-file-upload';

// Toastr
import { ToasterModule, ToasterService, ToasterConfig, Toast }  from 'angular2-toaster/angular2-toaster';

@Component({
  templateUrl: 'adddealer.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss', '../../../scss/vendors/ng-select/ng-select.scss',  '../../../scss/vendors/bs-datepicker/bs-datepicker.scss'],
  encapsulation: ViewEncapsulation.None
})


@Injectable()
export class AdddealerComponent {

	   private data: any;
  	private error: number;
    public eventIdArr:any;
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
  	private proilefiles:any;
  	private autogrps:any;
    private advagencies:any;
    private contactroles:any;
  	private noofcontacts:any;
    private havecontacts:any;
    private noofevents:any;
    private haveevents:any;
  	private countries:any;
  	private provinces:any;
  	private billcountries:any;
  	private billprovinces:any;
    private trainers:any;
    private primary:any;
    private datacontact:any;
    public oembrands: Array<IOption>;
	private checkVal: any;
  	private api_url: any;
    public uploader:FileUploader;
    public files:any;
    private fileRemove:any = 0;
	public uploaderProfile:FileUploader;
    private eventFileContainer:any;
   // private eventfilesdata: any;
   // private containerdata: any; 
    public eventuploader:FileUploader;
    public eventfiles:any;
    private eventfileRemove:any = 0;

    private contactForm:any = [];
    private newrecord:any = 0;
    private addDisable:any = 0;


    private eventForm:any = [];
    private neweventrecord:any = 0;
    private addEventDisable:any = 0;

    public bsStartValue = [ new Date()];
    public bsEndValue = [ new Date()];


  	private key:any;
  	private val:any;


    private centerdetails:any;
    private mrdetails:any;
    private autogrpdetails:any;
    private advagencydetails:any;
  	
  	public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  	public emailmask = emailMask;


    public centerModal;
    public mrModal;
    public autogrpModal;
    public advagencyModal;

    public centerselected = 0;
    public mrselected = 0;
    public autogrpselected = 0;
    public advagencyselected = 0;
	private today: any;
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
      } else if(localStorage.getItem('currentUserRoleId') == "5"){
        localStorage.setItem('currentUserRole', "DEALER");
      } else if(localStorage.getItem('currentUserRoleId') == "6"){
        localStorage.setItem('currentUserRole', "SUPPLIER");
      } else if(localStorage.getItem('currentUserRoleId') == "7"){
        localStorage.setItem('currentUserRole', "BDR");
      } else if(localStorage.getItem('currentUserRoleId') == "8"){
        localStorage.setItem('currentUserRole', "PRODCORD");
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
    		//kitdropdays:'',
    		oem: '',
    		brand: [],
    		center: '',
    		mr: '',
    		autogrp: '',
        advagency: '',

    		role_id: 5,

    		username:'',
    		password:'',
			created_by:localStorage.getItem('currentUserId'),
			created_on:today
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
    		name: ''
    	}

      this.eventdata = {
        memberId:'',
        eventname:[],
        description: [],
        trainer: [],
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
	this.toasterService = toasterService;
    	this.notsamebilladdr = 0;

       	let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
		
		this.api_url = API_URL;
		
		this.uploaderProfile = new FileUploader({url: '' ,
      allowedMimeType: ['image/gif','image/jpeg','image/png']});
    this.uploaderProfile.onAfterAddingFile = function(item) {
      var fileExtension = '.' + item.file.name.split('.').pop();

      item.file.name = item.file.name.split('.')[0] + new Date().getTime() + fileExtension;
    };
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

      this.http.get(API_URL+'/agencies?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
          console.log(response.json()); 
          this.advagencies = response.json();
      }, error => {
          console.log(JSON.stringify(error.json()));
      });

      this.http.get(API_URL+'/ContactPersonRoles?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
          console.log(response.json()); 
          this.contactroles = response.json();
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

      this.http.get(API_URL+'/Members?filter={"where":{"or":[{"role_id":2}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
          console.log(response.json()); 
          this.trainers = response.json();
      }, error => {
          console.log(JSON.stringify(error.json()));
      });


    	this.editparam = {
    		id: localStorage.getItem('currentUserId'),
    		action: 'edit'
    	}

    	this.noofcontacts = [1];
      this.havecontacts= [];
      this.noofevents = [];
      this.haveevents= [];

    	/* this.activatedRoute.params.subscribe((params) => {
	        let id = params['id'];
	        this.editparam.id = id;
	    }); */

      this.uploader = new FileUploader({url: API_URL+'/Containers/'+ this.editparam.id +'/upload?access_token='+localStorage.getItem('currentUserToken'),
      allowedMimeType: ['application/pdf', 'application/vnd.ms-excel'] });

      this.eventuploader = new FileUploader({url: '', allowedMimeType: ['application/pdf', 'application/vnd.ms-excel'] });

	   this.http.get(API_URL+'/Containers/'+this.editparam.id+'?access_token='+ localStorage.getItem('currentUserToken'),  options)
		  .subscribe(response => {     
			console.log(response.json());  
		  }, error => {
			  console.log(JSON.stringify(error.json()));
				

			this.http.post(API_URL+'/Containers?access_token='+ localStorage.getItem('currentUserToken'), '{"name":"'+this.editparam.id+'"}',  options)
			.subscribe(response => {
				console.log(response.json());
			}, error => {
				console.log(JSON.stringify(error.json()));
			});
			
		  });
		
      	this.http.get(API_URL+'/FileStorages?filter={"where":{"filePath":"/Containers/'+localStorage.getItem('currentUserId')+'","uploadType":"profile","status":"active"}}&access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
			console.log(response.json());  
			
			
				if(response.json().length == 0){
					this.checkVal = 0;
				} else {
					this.checkVal = 1;
          this.proilefiles = response.json()[0];
				}
			}, error => {
				console.log(JSON.stringify(error.json()));
			});

	  
	  
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
          this.userdata.center = response.json().center;
          
		    	this.onChangeBusinessCenter();
          this.onChangeMR();
          this.onChangeAutoGrp();
          this.onChangeAdvAgency();
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
                
                if(response.json()[res].primarycontact == "yes") {
                  this.primary.disable[res] = 1;
                } else {
                  this.primary.disable[res] = 0;
                }

                if(response.json()[res].datacontact == "yes") {
                  this.datacontact.disable[res] = 1;
                } else {
                  this.datacontact.disable[res] = 0;
                }
		        	}

		        	this.noofcontacts = [];
              this.havecontacts= [];
              this.newrecord = 0;

		        	for(let i=0; i<response.json().length; i++ ) { 
                this.contactForm.push(0);
              }
              for(let i=1; i<= response.json().length; i++ ) { 
                this.havecontacts.push(i);             
                this.noofcontacts.push(i);
              }
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
                this.eventdata.eventstart.push(moment(response.json()[res].eventstart).format("M/DD/YYYY"));
                this.eventdata.eventend.push(moment(response.json()[res].eventend).format("M/DD/YYYY"));
              }

              this.noofevents = [];
              this.haveevents= [];
              this.neweventrecord = 0;

              for(let i=0; i<response.json().length; i++ ) { 
                this.eventForm.push(0);
              }

              for(let i=1; i<= response.json().length; i++ ){ 
                this.haveevents.push(i);             
                this.noofevents.push(i);
              }

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


       /* if(localStorage.getItem('noticemessage') != null ){
          console.log(localStorage.getItem('noticemessage'));

          if(localStorage.getItem('noticemessage') == "dealeradd") {
           //   alert("Dealer Profile added successfully.");
             this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Dealer Profile added successfully."); 
          } 

          localStorage.setItem('noticemessage', null);
        }  */
	    }    	      
  	}

    editDealerEvent(index){
      this.neweventrecord = 0;
      this.addEventDisable = 0; 

      for(let i=0; i<this.eventForm.length; i++){
        this.eventForm[i] = 0;
      }

      this.eventForm[index-1] = 1;
    }

    addMoreEvent(){
      for(let i=0; i<this.eventForm.length; i++){
        this.eventForm[i] = 0;
      }

      this.neweventrecord = 1;

      if(this.noofevents.length == this.haveevents.length){
        if(this.noofevents.length == 0){
          this.noofevents.push(1); 
        } else {
          this.noofevents.push(this.noofevents[(this.noofevents.length-1)] + 1); 
        } 
      } else {
        delete (this.eventdata.eventname[this.noofevents.length-1]);
        delete (this.eventdata.description[this.noofevents.length-1]);
        delete (this.eventdata.trainer[this.noofevents.length-1]);
        delete (this.eventdata.eventstart[this.noofevents.length-1]);
        delete (this.eventdata.eventend[this.noofevents.length-1]);
      }
            this.eventfiles = [];
      this.eventuploader = new FileUploader({url: '', allowedMimeType: ['application/pdf', 'application/vnd.ms-excel'] });

      this.eventForm[(this.noofevents[this.noofevents.length-1])-1] = 1;

      
      this.addEventDisable = 1; 
    }

    removeEvent(data,removeVal){
      console.log(data.id[removeVal-1]);

      if(confirm("Are you sure?")){
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        this.http.delete(API_URL+'/Events/'+ data.id[removeVal-1] +'?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
            console.log(response.json()); 
            this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Dealer Event deleted successfully.");


            if(this.noofevents.length != 0){
              var index = this.noofevents.indexOf(removeVal);
              if (index >= 0) {
                this.noofevents.splice( index, 1 );
                this.haveevents.splice( index, 1 );
                this.eventForm[removeVal];

                delete (this.eventdata.eventname[index]);
                delete (this.eventdata.description[index]);
                delete (this.eventdata.trainer[index]);
                delete (this.eventdata.eventstart[index]);
                delete (this.eventdata.eventend[index]);

              }
            } else {

            }
        }, error => {
            console.log(JSON.stringify(error.json()));
        });  
      }
    }

    editEvent(event_data,index){
      console.log(event_data,index);
      this.neweventrecord = 0;
      this.addEventDisable = 0; 
      for(let i=0; i<this.eventForm.length; i++){
        this.eventForm[i] = 0;
      }
            this.eventForm[index-1] = 1;

            this.eventfiles = [];

        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

      this.http.get(API_URL+'/Containers/event_'+event_data.id[index-1]+'/files?access_token='+ localStorage.getItem('currentUserToken'), options)
      .subscribe(r => {
        console.log(r.json());
        if(r.json().length != 0){
            this.eventfiles = r.json();
            this.eventuploader = new FileUploader({url: '', allowedMimeType: ['application/pdf', 'application/vnd.ms-excel'] });
            console.log(this.eventfiles);
        } 
      }, error => {
          console.log(JSON.stringify(error.json()));
      }); 
    }


    editDealerContact(index){
      this.newrecord = 0;
      this.addDisable = 0; 

      for(let i=0; i<this.contactForm.length; i++){
        this.contactForm[i] = 0;
      }

      this.contactForm[index-1] = 1;
      this.primary.disable = [];
      this.datacontact.disable = [];

      for(let i=0; i<this.havecontacts.length; i++){
          this.primary.disable[i] = 0;
      }

      for(let i=0; i<this.havecontacts.length; i++){
          this.datacontact.disable[i] = 0;
      }

      for(let i=0; i<this.havecontacts.length; i++){
        if(this.contactdata.primarycontact[i] == "yes") {
          this.primary.disable[index-1] = 1;
        } 
      }

      for(let i=0; i<this.havecontacts.length; i++){
        if(this.contactdata.datacontact[i] == "yes") {
          this.datacontact.disable[index-1] = 1;
        } 
      }

    }

  	addMoreContact(){
      for(let i=0; i<this.contactForm.length; i++){
        this.contactForm[i] = 0;
      }

      this.newrecord = 1;

      if(this.noofcontacts.length == this.havecontacts.length){
          this.noofcontacts.push(this.noofcontacts[(this.noofcontacts.length-1)] + 1); 
      } else {
        delete (this.contactdata.contactperson[this.noofcontacts.length-1]);
        delete (this.contactdata.contactemail[this.noofcontacts.length-1]);
        delete (this.contactdata.contactrole[this.noofcontacts.length-1]);
        delete (this.contactdata.primarycontact[this.noofcontacts.length-1]);
        delete (this.contactdata.datacontact[this.noofcontacts.length-1]);
      }

      this.contactForm[(this.noofcontacts[this.noofcontacts.length-1])-1] = 1;
      this.primary.disable[(this.noofcontacts[this.noofcontacts.length-1])-1] = 0;
      this.datacontact.disable[(this.noofcontacts[this.noofcontacts.length-1])-1] = 0;


      for(let i=0; i<this.havecontacts.length; i++){
        if(this.contactdata.primarycontact[i] == "yes") {
          this.primary.disable[(this.noofcontacts[this.noofcontacts.length-1])-1] = 1;
        }   
      }

      for(let i=0; i<this.havecontacts.length; i++){
        if(this.contactdata.datacontact[i] == "yes") {
          this.datacontact.disable[(this.noofcontacts[this.noofcontacts.length-1])-1  ] = 1;
        } 
      }
  		
      this.addDisable = 1; 
      
  	}


  	removeContact(data,removeVal){      
      console.log(data.id[removeVal-1]);
      if(confirm("Are you sure?")){
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        this.http.delete(API_URL+'/contacts/'+ data.id[removeVal-1] +'?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
            console.log(response.json()); 
            this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Dealer Contact deleted successfully.");

        		if(this.noofcontacts.length != 0){
        			var index = this.noofcontacts.indexOf(removeVal);
        			if (index >= 0) {
        			  this.noofcontacts.splice( index, 1 );
                this.havecontacts.splice( index, 1 );
                this.contactForm[removeVal];

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
               delete (this.datacontact.disable[index]);

        			}
        		} else {

        		}
    		    console.log(this.noofcontacts);
        }, error => {
            console.log(JSON.stringify(error.json()));
        });  
    	}
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

      this.http.get(API_URL+'/Centers/'+ this.userdata.center +'?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
          console.log(response.json()); 
          this.centerdetails = response.json();
          this.centerselected = 1;
          this.centerdetails.primarycontact = {contactperson:'',contactemail:'',contactphone:''};

          this.http.get(API_URL+'/CenterContacts?filter=%7B%22where%22%3A%7B%22and%22%3A%5B%7B%22centerId%22%3A%22'+this.centerdetails.id+'%22%7D%2C%7B%22primarycontact%22%3A%22yes%22%7D%5D%7D%7D&access_token='+ localStorage.getItem('currentUserToken'), options)
          .subscribe(response => {
            console.log(response.json()); 
            if(response.json().length != 0)
              this.centerdetails.primarycontact = response.json()[0];
          }, error => {
              console.log(JSON.stringify(error.json()));
          });
      }, error => {
          console.log(JSON.stringify(error.json()));
      });
  	}

    onChangeMR(){
    let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
    
      this.http.get(API_URL+'/MRs/'+ this.userdata.mr +'?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
          console.log(response.json()); 
          this.mrdetails = response.json();
          this.mrselected = 1;
      }, error => {
          console.log(JSON.stringify(error.json()));
      });
    }

    onChangeAutoGrp(){
    let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
    
      this.http.get(API_URL+'/AutoGroups/'+ this.userdata.autogrp +'?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
          console.log(response.json()); 
          this.autogrpdetails = response.json();
          this.autogrpselected = 1;
          this.autogrpdetails.primarycontact = {contactperson:'',contactemail:'',contactphone:''};

          this.http.get(API_URL+'/AutoGroupContacts?filter=%7B%22where%22%3A%7B%22and%22%3A%5B%7B%22autoGroupId%22%3A%22'+this.autogrpdetails.id+'%22%7D%2C%7B%22primarycontact%22%3A%22yes%22%7D%5D%7D%7D&access_token='+ localStorage.getItem('currentUserToken'), options)
          .subscribe(response => {
            console.log(response.json()); 
            if(response.json().length != 0)
              this.autogrpdetails.primarycontact = response.json()[0];
          }, error => {
              console.log(JSON.stringify(error.json()));
          });

      }, error => {
          console.log(JSON.stringify(error.json()));
      });
    }

    onChangeAdvAgency(){
    let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
    
      this.http.get(API_URL+'/agencies/'+ this.userdata.advagency +'?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
          console.log(response.json()); 
          this.advagencydetails = response.json();
          this.advagencyselected = 1;
          this.advagencydetails.primarycontact = {contactperson:'',contactemail:'',contactphone:''};

          this.http.get(API_URL+'/AgencyContacts?filter=%7B%22where%22%3A%7B%22and%22%3A%5B%7B%22advertisingAgencyId%22%3A%22'+this.advagencydetails.id+'%22%7D%2C%7B%22primarycontact%22%3A%22yes%22%7D%5D%7D%7D&access_token='+ localStorage.getItem('currentUserToken'), options)
          .subscribe(response => {
            console.log(response.json()); 
            if(response.json().length != 0)
              this.advagencydetails.primarycontact = response.json()[0];
          }, error => {
              console.log(JSON.stringify(error.json()));
          });
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

		//this.userdata.username = (this.userdata.email).substring(0, (this.userdata.email).lastIndexOf("@"));

    this.userdata.username = this.userdata.email;
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

       // 	localStorage.setItem('noticemessage', 'dealeradd');
         // this.toasterService.popAsync('success', 'Success ', "Dealer Profile added successfully."); 
       //  this.router.navigate(['editdealer/'+response.json().id]);

          var toast: Toast = {
            type: 'success',
            title: 'Success',
            body: 'Dealer Profile added successfully.',
            onHideCallback: (toast) => this.router.navigate(['dealers/editdealer/'+response.json().id])  
          };
           
          this.toasterService.clear();	this.toasterService.pop(toast);

        }, error => {
            this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  error.json().error.message);
	        console.log(JSON.stringify(error.json()));
	    });
	}

	updateProfile(){
		let options = new RequestOptions();
		options.headers = new Headers();
		options.headers.append('Content-Type', 'application/json');
		options.headers.append('Accept', 'application/json');	

		if(this.userdata.password == '') {
			 delete this.userdata.password;
		} else {    			
			this.userdata.username;
			this.userdata.password;		
		}

		this.http.patch(API_URL+'/Members/'+this.editparam.id +'?access_token='+ localStorage.getItem('currentUserToken'), this.userdata,  options)
        .subscribe(response => {
        	console.log(response.json());
			this.uploaderProfile.options.url = API_URL+'/Containers/'+this.editparam.id +'/upload?access_token='+ localStorage.getItem('currentUserToken');

              for(let val of this.uploaderProfile.queue){
                val.url = API_URL+'/Containers/'+this.editparam.id +'/upload?access_token='+ localStorage.getItem('currentUserToken');

                console.log(val);
                val.upload();
            
                this.uploaderProfile.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
                    console.log("ImageUpload:uploaded:", item, status);
                    if(status == "200"){
                      let fileStorageData = {
                        memberId: this.editparam.id ,
                        filePath: '/Containers/'+this.editparam.id  ,
                        fileName: item.file.name,
                        fileTitle: '',  
                        uploadType: 'profile',
                        eventId: '',                  
                        status: 'active',  
                        created_by: localStorage.getItem('currentUserId'),  
                        updated_by: ''
                      }

                      this.http.post(API_URL+'/FileStorages?access_token='+ localStorage.getItem('currentUserToken'), fileStorageData ,  options)
                      .subscribe(storageRes => {
                        console.log(storageRes.json());
                      }, error => {
                          console.log(JSON.stringify(error.json()));
                      });
				

                    } else {
                      this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  "File: "+item.file.name+" not uploaded successfully");
                    }
                };

              }
        	this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Dealer Profile updated successfully.");		

	    }, error => {
            this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  error.json().error.message);
	        console.log(JSON.stringify(error.json()));
	    });
	}

	removeEventAttachmentProfile(file){
		console.log(file);
		 let options = new RequestOptions();
		  options.headers = new Headers();
		  options.headers.append('Content-Type', 'application/json');
		  options.headers.append('Accept', 'application/json');


		this.http.delete(API_URL+'/Containers/'+this.editparam.id+'/files/'+  file.fileName + '?access_token='+localStorage.getItem('currentUserToken'), options)
		.subscribe(response => {
		  console.log(response.json());
		  this.checkVal = 0;
		  this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Profile image file "+file.fileName+" deleted successfully.");

		  this.http.delete(API_URL+'/FileStorages/'+  file.id + '?access_token='+localStorage.getItem('currentUserToken'), options)
      .subscribe(response => {
        console.log(response.json());
        this.checkVal = 0;
      }, error => {
          this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  "Profile image file "+file.fileName+" deletion failed.");
        console.log(JSON.stringify(error.json()));
      });

		}, error => {
			  this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  "Profile image file "+file.fileName+" deletion failed.");
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
      
      this.contactForm[key].push(0);
			
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
        this.contactdata.id = [];

        for(let key in this.contactdata.contactperson){
      
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
                  this.contactdata.id.push(response.json().id);

                 if(this.contactdata.contactperson.length == (parseInt(key)+1)) {
                    this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Dealer Contacts updated successfully."); 
                 }
              }, error => {
                this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  error.json().error.message);
                console.log(JSON.stringify(error.json()));
            });
         }

        for(let i=0; i<this.contactForm.length; i++){
          this.contactForm[i] = 0;
        }

        this.addDisable = 0;  

        if(this.newrecord == 1){
          this.havecontacts.push(this.contactForm.length);
        } 

      }, error => {
        this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  error.json().error.message);
        console.log(JSON.stringify(error.json()));
    });
	}


  downloadEventAttachment(file,eventId){
    console.log(file);
     let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json');


    this.http.get(API_URL+'/Containers/event_'+eventId +'/download/'+  file.name + '?access_token='+localStorage.getItem('currentUserToken'), options)
    .subscribe(response => {
      this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Dealer downloaded file "+file.name+" successfully.");
    }, error => {
          this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  "Dealer downloaded file "+file.name+"  failed.");
        console.log(JSON.stringify(error.json()));
    });

  }

  removeEventAttachment(file,eventId){
    console.log(file);
     let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json');


    this.http.delete(API_URL+'/Containers/event_'+eventId+'/files/'+  file.name + '?access_token='+localStorage.getItem('currentUserToken'), options)
    .subscribe(response => {
      console.log(response.json());
      this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Dealer Uploaded file "+file.name+" deleted successfully.");

      const index: number = this.eventfiles.indexOf(file);
      console.log(index);
      if (index !== -1) {
       this.eventfiles.splice(index, 1);
      }   
    }, error => {
          this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  "Dealer Uploaded file "+file.name+" deletion failed.");
        console.log(JSON.stringify(error.json()));
    });

  }



   updateEvents(index){

    let options = new RequestOptions();
    options.headers = new Headers();
    options.headers.append('Content-Type', 'application/json');
    options.headers.append('Accept', 'application/json'); 

    let eventId = 0;
    this.eventIdArr = [];
  

    for(let key in this.eventdata.eventname){
      this.eventuploader.options.url = '';

      if(this.neweventrecord == 1 && (parseInt(key)+1) == this.eventdata.eventname.length){
        eventId = 0;
      } else {
        eventId = this.eventdata.id[key];
      }

      this.eventFileContainer = 'event_'+eventId;

      this.val = {
        memberId: this.editparam.id,
        eventname: this.eventdata.eventname[key],
        description: this.eventdata.description[key],
        trainer: this.eventdata.trainer[key],
        eventstart: this.eventdata.eventstart[key],
        eventend: this.eventdata.eventend[key]
      }

      this.http.post(API_URL+'/Events/upsertWithWhere?where={"id":"'+ eventId +'"}&access_token='+ localStorage.getItem('currentUserToken'), this.val,  options)
          .subscribe(response => {
            this.eventIdArr.push(response.json().id);

            if(this.neweventrecord == 1 && (parseInt(key)+1) == this.eventdata.eventname.length){
              if(this.eventdata.id == undefined){
                this.eventdata.id = [];
              }
              this.eventdata.id.push(response.json().id);
            } else {
              this.eventdata.id[key] = response.json().id;
            }

            if(parseInt(key) == index-1){
              if(this.neweventrecord == 1 && (parseInt(key)+1) == this.eventdata.eventname.length){
                
                this.http.post(API_URL+'/Containers?access_token='+ localStorage.getItem('currentUserToken'), {"name":"event_"+ response.json().id},  options)
                .subscribe(res => {

                }, error => {
                    console.log(JSON.stringify(error.json()));
                });

              } 

              this.eventuploader.options.url = API_URL+'/Containers/event_'+response.json().id+'/upload?access_token='+ localStorage.getItem('currentUserToken');


              for(let val of this.eventuploader.queue){
                val.url = API_URL+'/Containers/event_'+this.eventdata.id[key] +'/upload?access_token='+ localStorage.getItem('currentUserToken');

                console.log(val);
                val.upload();
              }
            }

            this.eventdata.eventstart[key] = moment(this.eventdata.eventstart[key]).format("M/DD/YYYY");
            this.eventdata.eventend[key] = moment(this.eventdata.eventend[key]).format("M/DD/YYYY");

            if(this.eventdata.eventname.length == (parseInt(key)+1)) {
              this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Dealer Events updated successfully."); 
            }   

            for(let i=0; i<this.eventForm.length; i++){
              this.eventForm[i] = 0;
            }

            this.addEventDisable = 0;  

            if(this.neweventrecord == 1 && (parseInt(key)+1) == this.eventdata.eventname.length){
              this.haveevents.push(this.eventForm.length);
            } 


          }, error => {
                this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  error.json().error.message);
            console.log(JSON.stringify(error.json()));
        });
        

   }

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

		

		//  this.http.post(API_URL+'/Members/update?where=%7B%22id%22%3A%22'+  this.editparam.id +'%22%7D&access_token='+ localStorage.getItem('currentUserToken'), this.settingsdata,  options)

    this.http.patch(API_URL+'/Members/'+this.editparam.id +'?access_token='+ localStorage.getItem('currentUserToken'), this.settingsdata,  options)
        .subscribe(response => {
        	console.log(response.json());	
        	this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Dealer Settings updated successfully.");		

	    }, error => {
            this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  error.json().error.message);
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
        		this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Dealer Uploads updated successfully.");
	        	
	        }, error => {
                this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  "Dealer Uploads not updated successfully.");
		        console.log(JSON.stringify(error.json()));
		    });

        }, error => {
            this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  error.json().error.message);
	        console.log(JSON.stringify(error.json()));
	    });

		
	}

  downloadAttachment(file){
    console.log(file);
     let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json');


    this.http.get(API_URL+'/Containers/'+ this.editparam.id +'/download/'+  file.name + '?access_token='+localStorage.getItem('currentUserToken'), options)
    .subscribe(response => {
      this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Dealer downloaded file "+file.name+" successfully.");
    }, error => {
          this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  "Dealer downloaded file "+file.name+"  failed.");
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
      this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Dealer Uploaded file "+file.name+" deleted successfully.");

      const index: number = this.files.indexOf(file);
      console.log(index);
      if (index !== -1) {
       this.files.splice(index, 1);
      }   
    }, error => {
          this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  "Dealer Uploaded file "+file.name+" deletion failed.");
        console.log(JSON.stringify(error.json()));
    });

  }

  downloadNewAttachment(file){
    console.log(file);
     let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json');


    this.http.get(API_URL+'/Containers/'+ this.editparam.id +'/download/'+  file.name + '?access_token='+localStorage.getItem('currentUserToken'), options)
    .subscribe(response => {
      this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Dealer downloaded file "+file.name+" successfully.");
    }, error => {
          this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  "Dealer downloaded file "+file.name+"  failed.");
        console.log(JSON.stringify(error.json()));
    });

  }

  removeNewAttachment(item){
    console.log(item.file);
    item.remove();

     let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json');


    this.http.delete(API_URL+'/Containers/'+ this.editparam.id +'/files/'+  item.file.name + '?access_token='+localStorage.getItem('currentUserToken'), options)
    .subscribe(response => {
      console.log(response.json());
      this.fileRemove = 1;
      this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Dealer Uploaded file "+item.file.name+" deleted successfully.");
    }, error => {
          this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  "Dealer Uploaded file "+item.file.name+" deletion failed.");
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
      		this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Dealer Uploads updated successfully.");
        	
        }, error => {
              this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  "Dealer Uploads not updated successfully.");
  	        console.log(JSON.stringify(error.json()));
  	    });

      }, error => {
          this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  error.json().error.message);
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
        	this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Dealer Address updated successfully.");
        	console.log(response.json());		

	    }, error => {
            this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  error.json().error.message);
	        console.log(JSON.stringify(error.json()));
	    });
	}
	salesOnly(sales){

     // numericOnly(event);
      const pattern = /[0-9\ ]/;
      let inputChar = String.fromCharCode(sales.charCode);
      if (!pattern.test(inputChar)) {
			 $('#error_sales').show();
        event.preventDefault();
        } else {
			$('#error_sales').hide();
		}
	}
	marketingOnly(marketing){
		 const pattern = /[0-9\ ]/;
      let inputChar = String.fromCharCode(marketing.charCode);
      if (!pattern.test(inputChar)) {
			$('#error_marketing').show();
        event.preventDefault();
        } else {
			$('#error_marketing').hide();
		}
	}

}
