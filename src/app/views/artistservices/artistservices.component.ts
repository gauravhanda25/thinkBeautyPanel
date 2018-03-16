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
	styleUrls: ['../../../scss/vendors/toastr/toastr.scss',  '../../../scss/vendors/bs-datepicker/bs-datepicker.scss'],
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
	private course: any;
	private coursedetail:any;
  public bsStartValue = new Date();
  public bsEndValue = new Date();
	private nocourses:any = 0;

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
    		duration: [],
    		artistId: localStorage.getItem('currentUserId'),
    		serviceId: '',
    		subserviceId: ''
    	}

    	this.course = { 
    		name: '',   		
    		price:'',
    		description: '' ,
    		guestno: '',
        location: '',
        startfrom: '',
        endon: '',
    		timeslotFrom: this.mytime,
    		timeslotTo: this.mytime,
    		artistId: localStorage.getItem('currentUserId')
    	}

    	this.coursedetail = { 
    		name: '',   		
    		price:'',
    		description: '' ,
    		guestno: '',
        location: '',
        startfrom: '',
        endon: '',
    		timeslotFrom: '',
    		timeslotTo: '',
    		artistId: localStorage.getItem('currentUserId')
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
                this.makeupservicesData[this.makeupservices[ser].id].price['Home'] = r.json()[0].price.home;
                this.makeupservicesData[this.makeupservices[ser].id].price['Salon'] = r.json()[0].price.salon;
                this.makeupservicesData[this.makeupservices[ser].id].price['GCC'] = r.json()[0].price.gcc;
                this.makeupservicesData[this.makeupservices[ser].id].duration['Home'] = r.json()[0].duration.home;
                this.makeupservicesData[this.makeupservices[ser].id].duration['Salon'] = r.json()[0].duration.salon;
                this.makeupservicesData[this.makeupservices[ser].id].duration['GCC'] = r.json()[0].duration.gcc;
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
                this.hairservicesData[this.hairservices[ser].id].price['Home'] = r.json()[0].price.home;
                this.hairservicesData[this.hairservices[ser].id].price['Salon'] = r.json()[0].price.salon;
                this.hairservicesData[this.hairservices[ser].id].price['GCC'] = r.json()[0].price.gcc;
                this.hairservicesData[this.hairservices[ser].id].duration['Home'] = r.json()[0].duration.home;
                this.hairservicesData[this.hairservices[ser].id].duration['Salon'] = r.json()[0].duration.salon;
                this.hairservicesData[this.hairservices[ser].id].duration['GCC'] = r.json()[0].duration.gcc;
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
	    		guestno: '',
          location: '',
          startfrom: '',
          endon: '',
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
    		guestno: course.guestno,
        location:  course.location,
        startfrom:  course.startfrom,
        endon:  course.endon,
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
	    		guestno: '',
          location: '',
          startfrom: '',
          endon: '',
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
      if(confirm("Are you sure?")){
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

}
