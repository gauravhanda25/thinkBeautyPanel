import { Component, ElementRef, NgZone, ViewChild, ViewEncapsulation } from '@angular/core';
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
import * as moment from 'moment';
import * as $ from 'jquery';


import { AgmCoreModule, MapsAPILoader } from '@agm/core';


// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ModalDirective } from 'ngx-bootstrap/modal';

// Toastr
import { ToasterModule, ToasterService, ToasterConfig, Toast }  from 'angular2-toaster/angular2-toaster';

// Ng2-file-upload
import { FileSelectDirective, FileDropDirective, FileUploadModule, FileUploader } from 'ng2-file-upload';

@Component({
	templateUrl: 'artistservices.component.html',
	styleUrls: ['../../../scss/vendors/toastr/toastr.scss', '../../../scss/vendors/ng-select/ng-select.scss',  '../../../scss/vendors/bs-datepicker/bs-datepicker.scss'],
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

  public servicetypes: Array<IOption> = [];


	private coursesData:any = [];
	private course: any;
	private coursedetaildata:any = [];
  public bsStartValue = new Date();
  public bsEndValue = new Date();
	private nocourses:any = 0;
  private today: any = new Date();

	private toasterService: ToasterService;
	public toasterconfig : ToasterConfig =
	  new ToasterConfig({
		tapToDismiss: true,
		timeout: 1000
	  });
	  

  /*   public searchControl: FormControl;
  @ViewChild("search"):any;
  public searchElementRef: ElementRef;
  private mapsAPILoader: MapsAPILoader;
  private ngZone: NgZone;  */


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
        homeprice:'',
        salonprice:'',
        gccprice:'',
        homeduration:'',
        salonduration:'',
        gccduration:'',
        artistId: localStorage.getItem('currentUserId'),
        serviceId: '',
        subserviceId: '',
        servicetype: ''
      }

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

    	this.coursedetaildata = { 
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


  //create search FormControl
  /*  this.searchControl = new FormControl();
    
     this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });   */

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
            for(let index in this.coursesData) {
              this.coursedetaildata[this.coursesData[index].id] = [];
              this.coursedetaildata[this.coursesData[index].id].startfrom = moment(this.coursesData[index].startfrom ).format('DD/MM/YYYY');
              this.coursedetaildata[this.coursesData[index].id].endon = moment(this.coursesData[index].endon ).format('DD/MM/YYYY');
            }
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
          this.makeup = [];
          this.nomakeup = 0;

        	let removedata:any = 0;

        	for(let ser in response.json()) {
	        	this.http.get(API_URL+'/Artistservices?filter={"where":{"and":[{"subserviceId":"'+response.json()[parseInt(ser)-removedata].id+'"},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
		        .subscribe(r => {
		        	if(r.json().length != 0) {
		        		this.makeupservicesData[response.json()[ser].id] = r.json()[0];
                this.makeupservicesData[response.json()[ser].id].price = [];
                this.makeupservicesData[response.json()[ser].id].duration = [];
                this.makeupservicesData[response.json()[ser].id].price['Home'] = r.json()[0].homeprice;
                this.makeupservicesData[response.json()[ser].id].price['Salon'] = r.json()[0].salonprice;
                this.makeupservicesData[response.json()[ser].id].price['GCC'] = r.json()[0].gccprice;
                this.makeupservicesData[response.json()[ser].id].duration['Home'] = r.json()[0].homeduration;
                this.makeupservicesData[response.json()[ser].id].duration['Salon'] = r.json()[0].salonduration;
                this.makeupservicesData[response.json()[ser].id].duration['GCC'] = r.json()[0].gccduration;
		        		this.makeup.push(response.json()[ser]);
		        		this.nomakeup = 1;

                console.log(this.makeupservicesData);
		        	} else if(r.json().length == 0){
		        		this.makeupservicesData[response.json()[ser].id] = '';
		        		delete this.makeupservices[ser];
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
          this.hair = [];
          this.nohair = 0;

        	let removedata:any = 0;

        	for(let ser in response.json()) {
	        	this.http.get(API_URL+'/Artistservices?filter={"where":{"and":[{"subserviceId":"'+response.json()[parseInt(ser)-removedata].id+ '"},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
		        .subscribe(r => {
		        	if(r.json().length != 0){
		        		this.hairservicesData[response.json()[ser].id] = r.json()[0];
                this.hairservicesData[response.json()[ser].id].price = [];
                this.hairservicesData[response.json()[ser].id].duration = [];
                this.hairservicesData[response.json()[ser].id].price['Home'] = r.json()[0].homeprice;
                this.hairservicesData[response.json()[ser].id].price['Salon'] = r.json()[0].salonprice;
                this.hairservicesData[response.json()[ser].id].price['GCC'] = r.json()[0].gccprice;
                this.hairservicesData[response.json()[ser].id].duration['Home'] = r.json()[0].homeduration;
                this.hairservicesData[response.json()[ser].id].duration['Salon'] = r.json()[0].salonduration;
                this.hairservicesData[response.json()[ser].id].duration['GCC'] = r.json()[0].gccduration;
		        		this.hair.push(response.json()[ser]);
		        		this.nohair = 1;
		        	} else if(r.json().length == 0){
		        		this.hairservicesData[response.json()[ser].id] = '';
		        		delete this.hairservices[ser];
		        	}
			    }, error => {
			        console.log(JSON.stringify(error.json()));
			    });
			}
	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });

  	}


    savesubservicedata(subserviceId, serviceId, serviceType) {
      this.data.serviceId = serviceId;
      this.data.subserviceId = subserviceId;

      let options = new RequestOptions();
      options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        this.data.servicetype = serviceType;
        delete this.data.duration;
        delete this.data.price;

        console.log(this.data);
       // return;


      this.http.post(API_URL+'/Artistservices/upsertWithWhere?where={"and":[{"artistId":"'+localStorage.getItem('currentUserId')+'"},{"subserviceId":"'+this.data.subserviceId+'"}]}&access_token='+ localStorage.getItem('currentUserToken'), this.data, options)
        .subscribe(response => {

        this.data = {   
          homeprice:'',
          salonprice:'',
          gccprice:'',
          homeduration:'',
          salonduration:'',
          gccduration:'',
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

    updatesubservicedata(artistSubserviceId,serviceType) {

      let options = new RequestOptions();
      options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        if(serviceType == "home") {
          this.data = { 
            homeprice: artistSubserviceId.homeprice,
            homeduration: artistSubserviceId.homeduration,
            servicetype: 'home'
          }
        } else if(serviceType == "salon") {
          this.data = { 
            salonprice:  artistSubserviceId.salonprice,
            salonduration: artistSubserviceId.salonduration,
            servicetype: 'salon'
          }
        } else if(serviceType == "gcc") {
          this.data = { 
            gccprice: artistSubserviceId.gccprice,
            gccduration: artistSubserviceId.gccduration,
            servicetype: 'gcc'
          }
        }


        console.log(this.data);

        delete this.data.duration;
        delete this.data.price;
        

      this.http.post(API_URL+'/Artistservices/upsertWithWhere?where=%7B%22id%22%3A%22'+artistSubserviceId.id+'%22%7D&access_token='+ localStorage.getItem('currentUserToken'), this.data, options)
        .subscribe(response => {
          console.log(response.json());

        this.data = { 
          homeprice:'',
          salonprice:'',
          gccprice:'',
          homeduration:'',
          salonduration:'',
          gccduration:'',
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
      if(confirm("Are you sure you want to remove this service?")){
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

    }


  	savecoursedata() {
  		let options = new RequestOptions();
	    options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
   
      if(new Date(this.am_pm_to_hours(this.course.timeslotFrom)) > new Date(this.am_pm_to_hours(this.course.timeslotTo)) && this.course.timeslotFrom != '' && this.course.timeslotTo != '') {
          this.toasterService.pop('error', 'Time invalid', "Course End Time is less than the Start Time"); 
          return;        
      }


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

          $(".closeModalButton").click();
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
   
      if(new Date(this.am_pm_to_hours(this.course.timeslotFrom)) > new Date(this.am_pm_to_hours(this.course.timeslotTo)) && this.course.timeslotFrom != '' && this.course.timeslotTo != '') {
          this.toasterService.pop('error', 'Time invalid', "Course End Time is less than the Start Time"); 
          return;        
      }


        this.coursedetaildata = { 
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

    	this.http.post(API_URL+'/Artistcourses/update?where=%7B%22id%22%3A%22'+course.id+'%22%7D&access_token='+ localStorage.getItem('currentUserToken'), this.coursedetaildata, options)
        .subscribe(response => {
        	console.log(response.json());

          $(".closeModalButton").click();
	    	this.coursedetaildata = { 
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

    
    am_pm_to_hours(time) {
        console.log(time);
        if(time == ''){
          return time;
        }
        let hours = Number(time.match(/^(\d+)/)[1]);
      //  alert(hours);
        let minutes = Number(time.match(/:(\d+)/)[1]);
      //  alert(minutes);
        let AMPM = time.slice(-2);
      //  alert(AMPM);
        if (AMPM == "pm" && hours < 12) hours = hours + 12;
        if (AMPM == "am" && hours == 12) hours = hours - 12;
        let sHours = hours.toString();
        let sMinutes = minutes.toString();
        if (hours < 10) sHours = "0" + sHours;
        if (minutes < 10) sMinutes = "0" + sMinutes;

        let d = new Date();    
        d.setHours(parseInt(sHours));
        d.setMinutes(parseInt(sMinutes));
        return d;
    }

}
