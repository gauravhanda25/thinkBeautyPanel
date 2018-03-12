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

import { ModalDirective } from 'ngx-bootstrap/modal';

// Toastr
import { ToasterModule, ToasterService, ToasterConfig, Toast }  from 'angular2-toaster/angular2-toaster';

// Ng2-file-upload
import { FileSelectDirective, FileDropDirective, FileUploadModule, FileUploader } from 'ng2-file-upload';

@Component({
	templateUrl: 'addartistservices.component.html',
	styleUrls: ['../../../scss/vendors/toastr/toastr.scss', '../../../scss/vendors/ng-select/ng-select.scss',  '../../../scss/vendors/bs-datepicker/bs-datepicker.scss'],
	encapsulation: ViewEncapsulation.None
})

@Injectable()
export class AddartistservicesComponent {

	private makeupservices: any;
	private makeupservicesData:any;
	private nailservices: any;
	private nailservicesData:any;
	private hairservices: any;
	private hairservicesData:any;

	private coursesData:any;

	public servicetypes: Array<IOption> = [];

	private data: any;
	private course: any;
	private coursedetail:any;
  	private editparam: any;

	private toasterService: ToasterService;
	public toasterconfig : ToasterConfig =
	  new ToasterConfig({
		tapToDismiss: true,
		timeout: 1000
	  });
	  
	
  // Timepicker

  public hstep:number = 1;
  public mstep:number = 15;
  public ismeridian:boolean = true;
  public isEnabled:boolean = true;

  public mytime:Date = new Date();
  public options:any = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  public toggleMode():void {
    this.ismeridian = !this.ismeridian;
  };

  public update():void {
    let d = new Date();
    d.setHours(14);
    d.setMinutes(0);
    this.mytime = d;
  };

  public changed():void {
    console.log('Time changed to: ' + this.mytime);
  };

  public clear():void {
    this.mytime = void 0;
  };




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
    		subserviceId: '',
    		servicetype: ''
    	}

    	this.course = { 
    		name: '',   		
    		price:'',
    		description: '' ,
    		duration: '',
    		timeslotFrom: this.mytime,
    		timeslotTo: this.mytime,
    		artistId: localStorage.getItem('currentUserId')
    	}

    	this.coursedetail = { 
    		name: '',   		
    		price:'',
    		description: '' ,
    		duration: '',
    		timeslotFrom: '',
    		timeslotTo: '',
    		artistId: localStorage.getItem('currentUserId')
    	}


    	this.getAllArtistCourseData();
    	this.getAllArtistData();
    	
    	this.editparam = {
    		id: '',
    		action: 'add'
    	}


    	this.servicetypes.push({label: "Home", value: "Home"});
    	this.servicetypes.push({label: "Salon", value: "Salon"});
    	this.servicetypes.push({label: "GCC", value: "GCC"});
        this.servicetypes = [...this.servicetypes];
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
        	//console.log(response.json());	
        	this.makeupservices = response.json();

        	this.makeupservicesData = [];

        	for(let ser in this.makeupservices) {
	        	this.http.get(API_URL+'/Artistservices?filter={"where":{"and":[{"subserviceId":"'+this.makeupservices[ser].id+'"},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
		        .subscribe(r => {
		        	if(r.json().length != 0){
		        		this.makeupservicesData[this.makeupservices[ser].id] = r.json()[0];
		        	} else {
		        		this.makeupservicesData[this.makeupservices[ser].id] = '';
		        	}
		        	console.log(this.makeupservicesData);
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

        	for(let ser in this.nailservices) {
	        	this.http.get(API_URL+'/Artistservices?filter={"where":{"and":[{"subserviceId":"'+this.nailservices[ser].id+'"},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
		        .subscribe(r => {
		        	if(r.json().length != 0){
		        		this.nailservicesData[this.nailservices[ser].id] = r.json()[0];
		        	} else {
		        		this.nailservicesData[this.nailservices[ser].id] = '';
		        	}
		        	console.log(this.nailservicesData);
			    }, error => {
			        console.log(JSON.stringify(error.json()));
			    });
			}
	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });

	    this.http.get(API_URL+'/Hairs?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	console.log(response.json());	
        	this.hairservices = response.json();

        	this.hairservicesData = [];

        	for(let ser in this.hairservices) {
	        	this.http.get(API_URL+'/Artistservices?filter={"where":{"and":[{"subserviceId":"'+this.hairservices[ser].id+'"},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
		        .subscribe(r => {
		        	if(r.json().length != 0){
		        		this.hairservicesData[this.hairservices[ser].id] = r.json()[0];
		        	} else {
		        		this.hairservicesData[this.hairservices[ser].id] = '';
		        	}
		        	console.log(this.hairservicesData);
			    }, error => {
			        console.log(JSON.stringify(error.json()));
			    });
			}
	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });

  	}


  	savesubservicedata(subserviceId, serviceId) {
  		this.data.serviceId = serviceId;
  		this.data.subserviceId = subserviceId;

  		let options = new RequestOptions();
	    options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        console.log(this.data);

    	this.http.post(API_URL+'/Artistservices?access_token='+ localStorage.getItem('currentUserToken'), this.data, options)
        .subscribe(response => {

	    	this.data = {    		
	    		price:'',
	    		duration: '',
	    		artistId: localStorage.getItem('currentUserId'),
	    		serviceId: '',
	    		subserviceId: '',
	    		servicetype: ''
	    	}
			this.toasterService.pop('success', 'Success', "Service saved successfully");
    		
    		this.getAllArtistData();

	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });

  	}

  	updatesubservicedata(artistSubserviceId) {
  		this.data = {
  			price: artistSubserviceId.price,
	    	duration: artistSubserviceId.duration,
	    	servicetype: artistSubserviceId.servicetype
  		}

  		let options = new RequestOptions();
	    options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        console.log(this.data);

    	this.http.post(API_URL+'/Artistservices/update?where=%7B%22id%22%3A%22'+artistSubserviceId.id+'%22%7D&access_token='+ localStorage.getItem('currentUserToken'), this.data, options)
        .subscribe(response => {
        	console.log(response.json());

	    	this.data = {    		
	    		price:'',
	    		duration: '',
	    		artistId: localStorage.getItem('currentUserId'),
	    		serviceId: '',
	    		subserviceId: '',
	    		servicetype: ''
	    	}
			this.toasterService.pop('success', 'Success', "Service updated successfully");
    		
    		this.getAllArtistData();

	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });

  	}

  	delsubservicedata(recordId) {
  		let options = new RequestOptions();
	    options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

    	this.http.delete(API_URL+'/Artistservices/'+recordId+'?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {

			this.toasterService.pop('success', 'Success', "Service removed successfully");

    		this.getAllArtistData();

	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });

  	}

  	savecoursedata() {
  		let options = new RequestOptions();
	    options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

    	this.http.post(API_URL+'/Artistcourses?access_token='+ localStorage.getItem('currentUserToken'), this.course, options)
        .subscribe(response => {

	    	this.course = { 
	    		name: '',   		
	    		price:'',
	    		description: '' ,
	    		duration: '',
	    		timeslotFrom: '',
	    		timeslotTo: '',
	    		artistId: localStorage.getItem('currentUserId')
	    	}

			this.toasterService.pop('success', 'Success', "Course saved successfully");
    		
    		this.getAllArtistCourseData();

	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });

  	}

  	updatecoursedata(course) {

  		let options = new RequestOptions();
	    options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        this.coursedetail = { 
    		name: course.name,   		
    		price: course.price,
    		description: course.description ,
    		duration: course.duration,
    		timeslotFrom: course.timeslotFrom,
    		timeslotTo: course.timeslotTo,
    		artistId: localStorage.getItem('currentUserId')
    	}

    	this.http.post(API_URL+'/Artistcourses/update?where=%7B%22id%22%3A%22'+course.id+'%22%7D&access_token='+ localStorage.getItem('currentUserToken'), this.coursedetail, options)
        .subscribe(response => {
        	console.log(response.json());

	    	this.coursedetail = { 
	    		name: '',   		
	    		price:'',
	    		description: '' ,
	    		duration: '',
	    		timeslotFrom: '',
	    		timeslotTo: '',
	    		artistId: localStorage.getItem('currentUserId')
	    	}

			this.toasterService.pop('success', 'Success', "Course updated successfully");
    		
    		this.getAllArtistCourseData();

	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });

  	}

  	delcoursedata(courseId) {
  		let options = new RequestOptions();
	    options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

    	this.http.delete(API_URL+'/Artistcourses/'+courseId+'?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {

			this.toasterService.pop('success', 'Success', "Course removed successfully");

    		this.getAllArtistCourseData();

	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });

  	}


}
