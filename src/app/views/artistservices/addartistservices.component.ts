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
import * as moment from 'moment';
import * as $ from 'jquery';

// Datepicker
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap';

// Tabs Component
import { TabsModule } from 'ngx-bootstrap/tabs';

import { ModalDirective } from 'ngx-bootstrap/modal';

// Toastr
import { ToasterModule, ToasterService, ToasterConfig, Toast }  from 'angular2-toaster/angular2-toaster';

// Ng2-file-upload
import { FileSelectDirective, FileDropDirective, FileUploadModule, FileUploader } from 'ng2-file-upload';

import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';

@Component({
	templateUrl: 'addartistservices.component.html',
	styleUrls: ['../../../scss/vendors/toastr/toastr.scss', '../../../scss/vendors/ng-select/ng-select.scss',  '../../../scss/vendors/bs-datepicker/bs-datepicker.scss'],

  // styles : ['#search_places{border: 1px solid #c2cfd6;padding: 0.375rem 0.75rem;font-size: 0.875rem;line-height: 1.5;color: #3e515b; height:auto} .custom-autocomplete__dropdown { height : 100px; overflow-y:scroll; top:8px;} .custom-autocomplete__dropdown li.active a {background-color:#ceb26f} '],

	encapsulation: ViewEncapsulation.None
})

@Injectable()
export class AddartistservicesComponent {

  private makeupservices: any;
	private photoexist: any;
	private makeupservicesData:any;
	private nailsservices: any;
	private nailsservicesData:any;
	private hairservices: any;
	private hairservicesData:any;

  private currency:any = localStorage.getItem('currentUserCurrency');
	private coursesData:any = [];

	public servicetypes: Array<IOption> = [];
  
  public apiUrl:any = API_URL;

	private data: any;
	private course: any;
	private coursedetaildata:any;
  public bsStartValue = new Date();
  public bsEndValue = new Date();
  private editparam: any;  
  private today: any = new Date();

  private locationSelected:any = '';
  private userSettings: any = {};

	private toasterService: ToasterService;
	public toasterconfig : ToasterConfig =
	  new ToasterConfig({
		tapToDismiss: true,
		timeout: 5000
	  });
	     private filesdata: any;
    private containerdata: any;
    public uploader:FileUploader;
    public files:any = [];
    private fileRemove:any = 0;

    public loggedInUserId:any = localStorage.getItem('currentUserId');
	
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


  public loginUserRole:any;

    private datePickerConfig: Partial<BsDatepickerConfig>;

    private profession_vals: any;
    private makeupAsProfesion:any = 0;
    private hairAsProfesion:any = 0;

    constructor(private NgxRolesService: NgxRolesService, private NgxPermissionsService: NgxPermissionsService, @Inject(Http) private http: Http, @Inject(Router)private router:Router, private activatedRoute: ActivatedRoute,toasterService: ToasterService) {
		//console.log(localStorage.getItem('currentUserRoleId'));
        $('.preloader').show();

        this.userSettings = {
           showSearchButton: false,
           showCurrentLocation: false,
           locationIconUrl: '',
           inputPlaceholderText: 'Course Location'
         }
 			
	  if(localStorage.getItem('currentUserRoleId') == "1"){
        localStorage.setItem('currentUserRole', "ADMIN");
        this.loginUserRole = "admin";
      } else if(localStorage.getItem('currentUserRoleId') == "2"){
        localStorage.setItem('currentUserRole', "ARTIST");
        this.loginUserRole = "artist";
      } else if(localStorage.getItem('currentUserRoleId') == "3"){
        localStorage.setItem('currentUserRole', "SALON");
        this.loginUserRole = "salon";
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

    this.datePickerConfig = Object.assign({},
    {
      showWeekNumbers: false
    });

		this.toasterService = toasterService;
		
    this.filesdata = {
        file:''
      }

      this.containerdata = {
        name: ''
      }

       this.profession_vals = ['Make Up', 'Hair', 'Make Up & Hair'];

      let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json'); 


     this.http.get(API_URL+'/Containers/'+this.loggedInUserId+'?access_token='+ localStorage.getItem('currentUserToken'),  options)
      .subscribe(response => {     
        console.log(response.json());  
      }, error => {
          console.log(JSON.stringify(error.json()));
            

        this.http.post(API_URL+'/Containers?access_token='+ localStorage.getItem('currentUserToken'), '{"name":"'+this.loggedInUserId+'"}',  options)
        .subscribe(response => {
            console.log(response.json());
        }, error => {
            console.log(JSON.stringify(error.json()));
        });
        
      });

      this.uploader = new FileUploader({url: '',
      allowedMimeType: ['image/gif','image/jpeg','image/png'] });
    

    
    	this.data = {
        price:'',
        fixedcharge:'',
        duration:'',
        memberId: localStorage.getItem('currentUserId'),
        memberType: (localStorage.getItem('currentUserRole') == 'SALON' ? 'salon' : 'artist'),
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
        memberId: localStorage.getItem('currentUserId'),
        memberType: (localStorage.getItem('currentUserRole') == 'SALON' ? 'salon' : 'artist')
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
        memberId: localStorage.getItem('currentUserId'),
        memberType: (localStorage.getItem('currentUserRole') == 'SALON' ? 'salon' : 'artist')
    	}

       this.http.get(API_URL+'/Members?filter={"where":{"and":[{"id":"'+localStorage.getItem('currentUserId')+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
      .subscribe(r => {
      console.log(r.json());
        if(r.json().length != 0){
          this.makeupAsProfesion = (r.json()[0].artist_profession == 1 || r.json()[0].artist_profession == 3) ? 1 : 0;
          this.hairAsProfesion = (r.json()[0].artist_profession == 2 || r.json()[0].artist_profession == 3) ? 1 : 0;
        }
      }, error => {
        console.log(JSON.stringify(error.json()));
      });


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

    autoCompleteCallback1(selectedData:any) {
      if(selectedData.data != undefined) {
        this.locationSelected = selectedData.data.formatted_address;
      } else {
        this.locationSelected = '';     
      }
    }


    numericOnly(event: any) {
      const pattern = /[0-9\+\-\ ]/;
      let inputChar = String.fromCharCode(event.charCode);
      if (!pattern.test(inputChar)) {
        // invalid character, prevent input
        event.preventDefault();
      }
    }

  	getAllArtistCourseData(){
  		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        this.http.get(API_URL+'/Artistcourses?filter={"where":{"and":[{"memberId":"'+localStorage.getItem('currentUserId')+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(r => {
          this.coursesData = [];
          this.coursedetaildata= [];
          
        	if(r.json().length != 0){
        		this.coursesData = r.json();
            for(let index in this.coursesData) {
              this.coursedetaildata[this.coursesData[index].id] = [];
              this.coursedetaildata[this.coursesData[index].id].startfrom = moment(this.coursesData[index].startfrom ).format('DD MMMM YYYY');
              this.coursedetaildata[this.coursesData[index].id].endon = moment(this.coursesData[index].endon ).format('DD MMMM YYYY');

            /*   this.userSettings.inputString = this.coursesData[index].location;
            console.log(this.userSettings.inputString);
            this.userSettings.inputString = Object.assign({},this.userSettings.inputString);  */

               this.coursesData[index].images = [];
           
           this.http.get(API_URL+'/FileStorages?filter={"where":{"and":[{"memberType":"'+this.coursesData[index].memberType+'"},{"uploadType":"course"},{"memberId":"'+this.loggedInUserId+'"},{"status":"active"},{"courseId":"'+this.coursesData[index].id+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
           .subscribe(storageRes => {
             this.coursesData[index].images = storageRes.json();
           }, error => {
              console.log(JSON.stringify(error.json()));
           });


            }
        	} else {
        		this.coursesData = '';
        	}

        	console.log(this.coursesData,this.coursedetaildata);
        $('.preloader').hide();
	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });
  	}

    
    prefillLocation(courseId, modal){
      let location = this.coursesData.filter(
          function(data){ return data.id == courseId }
      );
      console.log(typeof location[0].location, location[0].location)
      this.userSettings.inputString = location[0].location;
      this.userSettings = Object.assign({},this.userSettings)
      modal.show()
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
	        	this.http.get(API_URL+'/Artistservices?filter={"where":{"and":[{"subserviceId":"'+this.makeupservices[ser].id+'"},{"memberId":"'+localStorage.getItem('currentUserId')+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
		        .subscribe(r => {

              console.log(r.json());


		        	if(r.json().length != 0){
		        		this.makeupservicesData[this.makeupservices[ser].id] = r.json();
                 this.makeupservicesData[response.json()[ser].id]['home'] = [];
                 this.makeupservicesData[response.json()[ser].id]['salon'] = [];
                 this.makeupservicesData[response.json()[ser].id]['gcc'] = [];
                for(let i in r.json()){
                  this.makeupservicesData[response.json()[ser].id][r.json()[i].servicetype] = r.json()[i];            
                }
                console.log(this.makeupservicesData);
		        	} else {
		        		this.makeupservicesData[this.makeupservices[ser].id] = {};
                 this.makeupservicesData[response.json()[ser].id]['home'] = [];
                 this.makeupservicesData[response.json()[ser].id]['salon'] = [];
                 this.makeupservicesData[response.json()[ser].id]['gcc'] = [];
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
          this.nailsservices = response.json();

          this.nailsservicesData = [];

          for(let ser in this.nailsservices) {
            this.http.get(API_URL+'/Artistservices?filter={"where":{"and":[{"subserviceId":"'+this.nailsservices[ser].id+'"},{"memberId":"'+localStorage.getItem('currentUserId')+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
            .subscribe(r => {

              console.log(r.json());


              if(r.json().length != 0){
                this.nailsservicesData[response.json()[ser].id] = r.json();              
               this.nailsservicesData[response.json()[ser].id]['home'] = [];
               this.nailsservicesData[response.json()[ser].id]['salon'] = [];
               this.nailsservicesData[response.json()[ser].id]['gcc'] = [];
               for(let i in r.json()){
                this.nailsservicesData[response.json()[ser].id][r.json()[i].servicetype] = r.json()[i];            
              }

                console.log(this.nailsservicesData);
              } else {
              this.nailsservicesData[response.json()[ser].id] = {};              
               this.nailsservicesData[response.json()[ser].id]['home'] = [];
               this.nailsservicesData[response.json()[ser].id]['salon'] = [];
               this.nailsservicesData[response.json()[ser].id]['gcc'] = [];
              }
              console.log(this.nailsservicesData);
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
	        	this.http.get(API_URL+'/Artistservices?filter={"where":{"and":[{"subserviceId":"'+this.hairservices[ser].id+'"},{"memberId":"'+localStorage.getItem('currentUserId')+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
		        .subscribe(r => {
		        	if(r.json().length != 0){
		        		this.hairservicesData[this.hairservices[ser].id] = r.json();
                this.hairservicesData[response.json()[ser].id]['home'] = [];
                 this.hairservicesData[response.json()[ser].id]['salon'] = [];
                 this.hairservicesData[response.json()[ser].id]['gcc'] = [];
                for(let i in r.json()){
                  this.hairservicesData[response.json()[ser].id][r.json()[i].servicetype] = r.json()[i];            
                }
		        	} else {
		        		this.hairservicesData[this.hairservices[ser].id] = {};
                this.hairservicesData[response.json()[ser].id]['home'] = [];
                 this.hairservicesData[response.json()[ser].id]['salon'] = [];
                 this.hairservicesData[response.json()[ser].id]['gcc'] = [];
		        	}
		        	console.log(this.hairservicesData);
			    }, error => {
			        console.log(JSON.stringify(error.json()));
			    });
			}
	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });
        $('.preloader').hide();

  	}


  	savesubservicedata(subserviceId, serviceId, serviceType) {
        $('.preloader').show();
  		this.data.serviceId = serviceId;
  		this.data.subserviceId = subserviceId;

  		let options = new RequestOptions();
	    options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        this.data.servicetype = serviceType;

        console.log(this.data);
       // return;


    	this.http.post(API_URL+'/Artistservices?access_token='+ localStorage.getItem('currentUserToken'), this.data, options)
        .subscribe(response => {

	    	
        this.data = {
        price:'',
        fixedcharge:'',
        duration:'',
        memberId: localStorage.getItem('currentUserId'),
        memberType: (localStorage.getItem('currentUserRole') == 'SALON' ? 'salon' : 'artist'),
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
        $('.preloader').show();

  		let options = new RequestOptions();
	    options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        this.data = { 
          price: artistSubserviceId.price,
          duration: artistSubserviceId.duration,
          fixedcharge: (artistSubserviceId.fixedcharge != undefined) ? artistSubserviceId.fixedcharge : '',
          servicetype: serviceType
        }


    	this.http.post(API_URL+'/Artistservices/upsertWithWhere?where=%7B%22id%22%3A%22'+artistSubserviceId.id+'%22%7D&access_token='+ localStorage.getItem('currentUserToken'), this.data, options)
        .subscribe(response => {
        	console.log(response.json());

	    
       this.data = {
        price:'',
        fixedcharge:'',
        duration:'',
        memberId: localStorage.getItem('currentUserId'),
        memberType: (localStorage.getItem('currentUserRole') == 'SALON' ? 'salon' : 'artist'),
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
        $('.preloader').show();
        let options = new RequestOptions();
	      options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');


        if(recordId['home'] != '' && recordId['home'] != undefined) {
          //alert(recordId['home'].id);
          this.http.delete(API_URL+'/Artistservices/'+recordId['home'].id+'?access_token='+ localStorage.getItem('currentUserToken'), options)
          .subscribe(response => {

          this.toasterService.pop('success', 'Success', "Service removed successfully");

            this.getAllArtistData();

          }, error => {
              console.log(JSON.stringify(error.json()));
          });
        }

        if(recordId['salon'] != ''  && recordId['salon'] != undefined) {
        //  alert(recordId['salon'].id);
          this.http.delete(API_URL+'/Artistservices/'+recordId['salon'].id+'?access_token='+ localStorage.getItem('currentUserToken'), options)
          .subscribe(response => {

          this.toasterService.pop('success', 'Success', "Service removed successfully");

            this.getAllArtistData();

          }, error => {
              console.log(JSON.stringify(error.json()));
          });
        }

        if(recordId['gcc'] != ''  && recordId['gcc'] != undefined) {
         // alert(recordId['gcc'].id);
          this.http.delete(API_URL+'/Artistservices/'+recordId['gcc'].id+'?access_token='+ localStorage.getItem('currentUserToken'), options)
          .subscribe(response => {

          this.toasterService.pop('success', 'Success', "Service removed successfully");

            this.getAllArtistData();

          }, error => {
              console.log(JSON.stringify(error.json()));
          });
        }


      	/*this.http.delete(API_URL+'/Artistservices/'+recordId+'?access_token='+ localStorage.getItem('currentUserToken'), options)
          .subscribe(response => {

  			this.toasterService.pop('success', 'Success', "Service removed successfully");

      		this.getAllArtistData();

  	    }, error => {
  	        console.log(JSON.stringify(error.json()));
  	    });*/
      }

  	}

  	savecoursedata() {
        $('.preloader').show();
  		let options = new RequestOptions();
	    options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');


      
      if(new Date(this.am_pm_to_hours(this.course.timeslotFrom)) > new Date(this.am_pm_to_hours(this.course.timeslotTo)) && this.course.timeslotFrom != '' && this.course.timeslotTo != '') {
          $('.preloader').hide(); 
          this.toasterService.pop('error', 'Time invalid', "Course End Time is less than the Start Time"); 
          return;        
      }

      for(let i=0; i<this.coursesData.length; i++) {
      
        if((moment(this.course.startfrom).format('DD/MM/YYYY') < moment(this.coursesData[i].startfrom).format('DD/MM/YYYY') && moment(this.course.endon).format('DD/MM/YYYY') <  moment(this.coursesData[i].startfrom).format('DD/MM/YYYY')) || (moment(this.course.endon).format('DD/MM/YYYY') > moment(this.coursesData[i].startfrom).format('DD/MM/YYYY') && moment(this.course.startfrom).format('DD/MM/YYYY') >  moment(this.coursesData[i].endon).format('DD/MM/YYYY'))) {

        } else {
          $('.preloader').hide(); 
          this.toasterService.pop('error', 'Error', "Course already added for same date and time."); 
          return;        
        }

      }



      let locationVal:any = '';
      if(this.locationSelected == '') {
          $('.preloader').hide(); 
          this.toasterService.pop('error', 'Error', "Please select the location"); 
        return;        
      } 

      /* if(this.uploader.queue.length == 0){
        $('.preloader').hide(); 
          this.toasterService.pop('error', 'Error', "Please select the Course Image"); 
         return;    
      }  */

      this.course.location =  this.locationSelected;
      this.locationSelected = '';

    	this.http.post(API_URL+'/Artistcourses?access_token='+ localStorage.getItem('currentUserToken'), this.course, options)
        .subscribe(res => {
          console.log(res.json());

           this.uploader.options.url = API_URL+'/Containers/'+this.loggedInUserId+'/upload?access_token='+ localStorage.getItem('currentUserToken');


              for(let val of this.uploader.queue){
                val.url = API_URL+'/Containers/'+this.loggedInUserId+'/upload?access_token='+ localStorage.getItem('currentUserToken');

                console.log(val);
                val.upload();
            
                this.uploader.onSuccessItem = (item:any, response:any, status:any, headers:any) => {
                console.log("ImageUpload:uploaded:", item, status);
                if(status == "200"){
                  let fileStorageData = {
                    memberId: this.loggedInUserId,
                    memberType: (localStorage.getItem('currentUserRoleId') == "2" ? "artist" : "salon"),
                    filePath: '/Containers/'+this.loggedInUserId,
                    fileName: item.file.name,
                    uploadType: 'course' ,       
                    status: 'active',  
                    courseId: res.json().id,
                    created_by: this.loggedInUserId
                  }

                  this.http.post(API_URL+'/FileStorages?access_token='+ localStorage.getItem('currentUserToken'), fileStorageData ,  options)
                  .subscribe(storageRes => {
                    console.log(storageRes.json());
                  }, error => {
                      console.log(JSON.stringify(error.json()));
                  });

                } else {
                  this.toasterService.pop('error', 'Error ',  "File: "+item.file.name+" not uploaded successfully");
                }
            };

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
          memberId: localStorage.getItem('currentUserId'),
          memberType: (localStorage.getItem('currentUserRole') == 'SALON' ? 'salon' : 'artist')
	    	}

			this.toasterService.pop('success', 'Success', "Course saved successfully");
    		
          $(".closeModalButton").click();
    		this.getAllArtistCourseData();

	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });

  	}

  	updatecoursedata(course) {

        $('.preloader').show();
  		  let options = new RequestOptions();
	      options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

           
      if(new Date(this.am_pm_to_hours(this.course.timeslotFrom)) > new Date(this.am_pm_to_hours(this.course.timeslotTo)) && this.course.timeslotFrom != '' && this.course.timeslotTo != '') {
          $('.preloader').hide(); 
          this.toasterService.pop('error', 'Time invalid', "Course End Time is less than the Start Time"); 
          return;        
      }

      for(let i=0; i<this.coursesData.length; i++) {
      
         if((((moment(course.startfrom).format('DD/MM/YYYY') < moment(this.coursesData[i].startfrom).format('DD/MM/YYYY') && moment(course.endon).format('DD/MM/YYYY') <  moment(this.coursesData[i].startfrom).format('DD/MM/YYYY')) || (moment(course.endon).format('DD/MM/YYYY') > moment(this.coursesData[i].startfrom).format('DD/MM/YYYY') && moment(course.startfrom).format('DD/MM/YYYY') >  moment(this.coursesData[i].endon).format('DD/MM/YYYY'))) && course.id != this.coursesData[i].id) || course.id == this.coursesData[i].id) {

        } else {
          $('.preloader').hide(); 
          this.toasterService.pop('error', 'Error', "Course already added for same date and time."); 
          return;        
        }

      }

      // alert(this.userSettings.inputString);

     let locationVal:any = '';
      if(this.locationSelected == '' && this.userSettings.inputString == '') {
          $('.preloader').hide(); 
          this.toasterService.pop('error', 'Error', "Please select the location"); 
        return;        
      } else if(this.locationSelected != '') {
        locationVal = this.locationSelected;
      } else if(this.userSettings.inputString != '') {
        locationVal = this.userSettings.inputString;
      }

      /* if(this.uploader.queue.length == 0  && course.images.length == 0){
        $('.preloader').hide(); 
          this.toasterService.pop('error', 'Error', "Please select the Course Image"); 
         return;    
      }  */

        this.coursedetaildata = { 
      		name: course.name,   		
      		price: course.price,
      		description: course.description ,
      		guestno: course.guestno,
          location: locationVal,
          startfrom: course.startfrom,
          endon: course.endon,
      		timeslotFrom: course.timeslotFrom,
      		timeslotTo: course.timeslotTo,
          memberId: localStorage.getItem('currentUserId'),
          memberType: (localStorage.getItem('currentUserRole') == 'SALON' ? 'salon' : 'artist')
      	}
      
      this.locationSelected = '';


    	this.http.post(API_URL+'/Artistcourses/update?where=%7B%22id%22%3A%22'+course.id+'%22%7D&access_token='+ localStorage.getItem('currentUserToken'), this.coursedetaildata, options)
        .subscribe(res => {
        console.log(res.json());

        this.uploader.options.url = API_URL+'/Containers/'+this.loggedInUserId+'/upload?access_token='+ localStorage.getItem('currentUserToken');


          for(let val of this.uploader.queue){
            val.url = API_URL+'/Containers/'+this.loggedInUserId+'/upload?access_token='+ localStorage.getItem('currentUserToken');

            console.log(val);
            val.upload();
        
            this.uploader.onSuccessItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, status);
            if(status == "200"){
              let fileStorageData = {
                memberId: this.loggedInUserId,
                memberType: (localStorage.getItem('currentUserRoleId') == "2" ? "artist" : "salon"),
                filePath: '/Containers/'+this.loggedInUserId,
                fileName: item.file.name,
                uploadType: 'course' ,       
                status: 'active',  
                courseId: course.id,
                created_by: this.loggedInUserId
              }

              this.http.post(API_URL+'/FileStorages?access_token='+ localStorage.getItem('currentUserToken'), fileStorageData ,  options)
              .subscribe(storageRes => {
                console.log(storageRes.json());
              }, error => {
                  console.log(JSON.stringify(error.json()));
              });

            } else {
              this.toasterService.pop('error', 'Error ',  "File: "+item.file.name+" not uploaded successfully");
            }
        };

          }

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
          memberId: localStorage.getItem('currentUserId'),
          memberType: (localStorage.getItem('currentUserRole') == 'SALON' ? 'salon' : 'artist'),
	    	}

			this.toasterService.pop('success', 'Success', "Course updated successfully");
    		
    		this.getAllArtistCourseData();

	    }, error => {
	        console.log(JSON.stringify(error.json()));
	    });

  	}

  	delcoursedata(courseId) {
      if(confirm("Are you sure you want to remove this course?")){
        $('.preloader').show();
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

      downloadAttachment(file){
    console.log(file);
     let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json');


    this.http.get(API_URL+'/Containers/'+file.memberId+'/download/'+file.fileName+ '?access_token='+localStorage.getItem('currentUserToken'), options)
    .subscribe(response => {    
      window.open(API_URL+'/Containers/'+file.memberId+'/download/'+file.fileName);
      this.toasterService.pop('success', 'Success ', "Gallery downloaded file "+file.fileName+" successfully.");
    }, error => {
          this.toasterService.pop('error', 'Error ',  "Gallery downloaded file "+file.fileName+"  failed.");
        console.log(JSON.stringify(error.json()));
    });

  }

  removeAttachment(file){
    console.log(file);
     let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json');

      this.http.delete(API_URL+'/Containers/'+ file.memberId +'/files/'+  file.fileName + '?access_token='+localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
          console.log(response.json());
          this.toasterService.pop('success', 'Success ', "Gallery Uploaded file "+file.fileName+" deleted successfully.");

         this.photoexist = 0;

          this.http.post(API_URL+'/FileStorages/update?where={"id":"'+file.id+'"}&access_token='+ localStorage.getItem('currentUserToken'), {"status":"inactive"}, options)
          .subscribe(findres => {


          }, error => {
              console.log(JSON.stringify(error.json()));
          });
      }, error => {
            this.toasterService.pop('error', 'Error ',  "Gallery Uploaded file "+file.fileName+" deletion failed.");
          console.log(JSON.stringify(error.json()));
      });
  }


}
