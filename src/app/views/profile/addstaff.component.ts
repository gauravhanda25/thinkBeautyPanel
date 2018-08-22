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
import * as $ from 'jQuery';

import { TextMaskModule } from 'angular2-text-mask';
import emailMask from 'text-mask-addons/dist/emailMask';

// Toastr
import { ToasterModule, ToasterService, ToasterConfig }  from 'angular2-toaster/angular2-toaster';

// Ng2-file-upload
import { FileSelectDirective, FileDropDirective, FileUploadModule, FileUploader } from 'ng2-file-upload';

@Component({
  templateUrl: 'addstaff.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})

@Injectable()
export class AddstaffComponent {

	private data: any;
  	private error: number;
  	private checkVal: any;
  	private api_url: any;
  	private editparam: any;
  	private countries: any;
  	private provinces: any;

	public professions: Array<IOption> = [];
  	public mask = [/[1-9]/, /\d/, /\d/, ' ',/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
  	public emailmask = emailMask;
  	private userrole:any;

  	private today: any;
	private proilefiles: any;
	public uploader:FileUploader;

	public imageDeleted:any = 0;

  	private toasterService: ToasterService;

    public toasterconfig : ToasterConfig =
      new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
      });

    constructor(private NgxRolesService: NgxRolesService, private NgxPermissionsService: NgxPermissionsService, @Inject(Http) private http: Http, @Inject(Router)private router:Router, private activatedRoute: ActivatedRoute, toasterService: ToasterService ) {

	    if(localStorage.getItem('currentUserRoleId') == "1"){
	      localStorage.setItem('currentUserRole', "ADMIN");
	      this.userrole = 'admin';
	    } else if(localStorage.getItem('currentUserRoleId') == "2"){
	      localStorage.setItem('currentUserRole', "ARTIST");
	      this.userrole = 'artist';
	    } else if(localStorage.getItem('currentUserRoleId') == "3"){
	      localStorage.setItem('currentUserRole', "SALON");
	      this.userrole = 'salon';
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
    		description:'',
    		role_id:localStorage.getItem('currentUserRoleId'),
    		artist_profession:[],
    		contact_person_name:'',
    		contact_person_mobile:'',
    		villa:'',
    		road:'',
    		city:'',
    		cpr:'',
    		password:'',
    		//emailVerified: false,
    		status: 'active',
    		//created_on: today
    	}

    	this.professions.push({label: "Makeup", value: "1"});
    	this.professions.push({label: "Hair", value: "2"});
    	this.professions.push({label: "Microblading", value: "3"});
        this.professions = [...this.professions];

    	let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');




		this.api_url = API_URL;
		
		this.uploader = new FileUploader({url: '',
      allowedMimeType: ['image/gif','image/jpeg','image/png'], queueLimit: 1 });
		this.uploader.onAfterAddingFile = function(item) {
      var fileExtension = '.' + item.file.name.split('.').pop();

      item.file.name = item.file.name.split('.')[0] + new Date().getTime() + fileExtension;
    };

    	this.http.get(API_URL+'/Countries?filter={"order":"name ASC"}&access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	console.log(response.json());	
        	this.countries = response.json();
	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });


    	this.http.get(API_URL+'/Members/'+ localStorage.getItem('currentUserId') +'?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	console.log(response.json());	
        	this.data = response.json();
        
        	this.onChangeCountry();

	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });
    
    	 this.http.get(API_URL+'/Containers/'+localStorage.getItem('currentUserId') +'?access_token='+ localStorage.getItem('currentUserToken'),  options)
		  .subscribe(response => {     
			console.log(response.json());  
		  }, error => {
			  console.log(JSON.stringify(error.json()));
				

			this.http.post(API_URL+'/Containers?access_token='+ localStorage.getItem('currentUserToken'), '{"name":"'+localStorage.getItem('currentUserId') +'"}',  options)
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
		$('.preloader').show();
		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
		

        if(this.imageDeleted == 1) {
          this.removeEventAttachment(this.proilefiles);
        }

		this.data.role_id = parseInt(this.data.role_id);
		
		if(this.data.password == '') {
			delete(this.data.password);
		}

		this.http.post(API_URL+'/Members/update?where=%7B%22id%22%3A%22'+  this.data.id +'%22%7D&access_token='+ localStorage.getItem('currentUserToken'), this.data,  options)
        .subscribe(response => {
        	console.log(response.json());	

			this.uploader.options.url = API_URL+'/Containers/'+localStorage.getItem('currentUserId')+'/upload?access_token='+ localStorage.getItem('currentUserToken');
			
			if(this.uploader.queue.length != 0) {	
              for(let val of this.uploader.queue){
                val.url = API_URL+'/Containers/'+localStorage.getItem('currentUserId')+'/upload?access_token='+ localStorage.getItem('currentUserToken');

                console.log(val);
                val.upload();
            
                this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
                    console.log("ImageUpload:uploaded:", item, status);
                    if(status == "200"){
                      let fileStorageData = {
                        memberId: localStorage.getItem('currentUserId') ,
                        filePath: '/Containers/'+localStorage.getItem('currentUserId')  ,
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


						this.router.navigate(['dashboard']);
                      }, error => {
                          console.log(JSON.stringify(error.json()));
                      });
				

                    } else {
                      this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  "File: "+item.file.name+" not uploaded successfully");
                    }
                };

              }
             } else {
             	this.router.navigate(['dashboard']);
             }


		$('.preloader').hide();
				this.toasterService.pop('success', 'Success ', "Profile updated successfully.");	
           	
	    }, error => {
		$('.preloader').hide();
	    	if(error.json().error.statusCode == "422") {
            	this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  "Email Address already exists. Please use different email");
            	this.error = 1;
	    	} else {
            	this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  error.json().error.message);
	    	}
	        console.log(JSON.stringify(error.json()));
	    });

	}

	 deleteImageOnUpdate(file){
	    this.imageDeleted = 1;
	  }


	removeEventAttachment(file){
		console.log(file);
		 let options = new RequestOptions();
		  options.headers = new Headers();
		  options.headers.append('Content-Type', 'application/json');
		  options.headers.append('Accept', 'application/json');


		this.http.delete(API_URL+'/Containers/'+localStorage.getItem('currentUserId')+'/files/'+  file.fileName + '?access_token='+localStorage.getItem('currentUserToken'), options)
		.subscribe(response => {
		  console.log(response.json());
		  this.checkVal = 0;
          this.imageDeleted = 0;
		  this.toasterService.pop('success', 'Success ', "Profile image file "+file.fileName+" deleted successfully.");

		  
		  this.http.delete(API_URL+'/FileStorages/'+  file.id + '?access_token='+localStorage.getItem('currentUserToken'), options)
	      .subscribe(response => {
	        console.log(response.json());
	        this.checkVal = 0;
             this.imageDeleted = 0;
	      }, error => {
	          this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  "Profile image file "+file.fileName+" deletion failed.");
	        console.log(JSON.stringify(error.json()));
	      });
		}, error => {
			  this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  "Profile image file "+file.fileName+" deletion failed.");
			console.log(JSON.stringify(error.json()));
		});

	  }


}
