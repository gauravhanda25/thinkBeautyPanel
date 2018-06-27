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
import * as moment from 'moment';
import * as $ from 'jquery';
import { ModalDirective } from 'ngx-bootstrap/modal';


// Datepicker
import { BsDatepickerModule,BsDatepickerConfig } from 'ngx-bootstrap';

// Toastr
import { ToasterModule, ToasterService, ToasterConfig }  from 'angular2-toaster/angular2-toaster';
@Component({
	templateUrl: 'artistavail.component.html',
	styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ArtistavailComponent {

	private data: any;
  private dataweekend:any;

	private editparam: any;
	private workingdays :any = ['Sunday','Monday','Tuesday','Wednesday','Thursday'];
	private workingdayno :any = [0,1,2,3,4];
  private weekenddays :any = ['Friday','Saturday'];
  private weekenddayno :any = [0,1];
  private currency:any = localStorage.getItem('currentUserCurrency');
	
	private workingData:any = [];
  private weekendData:any = [];
  private specificData:any = [];
  private availData:any;  
  private workingBreakData:any = [];
  private weekendBreakData:any = [];

  private workingAvail:any = 0;
  private weekendAvail:any = 0;
  private dateAvail:any = 0;
  private workingBreakAvail:any = 0;
  private weekendBreakAvail:any = 0;

  public bsStartValue = new Date();
   private today = new Date();
   private break: any = 0;
   private breakweekend: any = 0;
   private tabActive = '';

	private toasterService: ToasterService;
	public toasterconfig : ToasterConfig =
	  new ToasterConfig({
		tapToDismiss: true,
		timeout: 5000
	  });
	  
	  
    private datePickerConfig: Partial<BsDatepickerConfig>;
    
    constructor(private NgxRolesService: NgxRolesService, private NgxPermissionsService: NgxPermissionsService, @Inject(Http) private http: Http, @Inject(Router)private router:Router, private activatedRoute: ActivatedRoute,toasterService: ToasterService) {
		//console.log(localStorage.getItem('currentUserRoleId'));
 			$('.preloader').show();
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

    this.datePickerConfig = Object.assign({},
    {
      showWeekNumbers: false
    });

		this.toasterService = toasterService;

    this.data = { 
        days: "working",      
        hoursfrom: '',
        hoursto: '',
        breakfrom: '',
        breakto: '',
        memberId: localStorage.getItem('currentUserId'),
        memberType: (localStorage.getItem('currentUserRole') == 'SALON' ? 'salon' : 'artist'),
     
        createdon: new Date()
      }
      
      this.dataweekend = { 
        days: "weekend",      
        hoursfrom: '',
        hoursto: '',
        breakfrom: '',
        breakto: '',
        memberId: localStorage.getItem('currentUserId'),
        memberType: (localStorage.getItem('currentUserRole') == 'SALON' ? 'salon' : 'artist'),

        createdon: new Date()
      }


      if(this.router.url == "/schedule/work/specific") {
        this.tabActive = "specific"
      } else {
        this.tabActive = ""
      }

      this.getAllAvailData();

  	}

    showBreakSlots() {
      this.break = 1;
    }

    removeBreakSlots() {
      this.break = 0;
      this.data.breakfrom = '';
      this.data.breakto = '';
    }

    showWeekendBreakSlots() {
      this.breakweekend = 1;
    }

    removeWeekendBreakSlots() {
      this.breakweekend = 0;
      this.dataweekend.breakfrom = '';
      this.dataweekend.breakto = '';
    }

  	getAllAvailData() {
  		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

    	   this.http.get(API_URL+'/Artistavailabilities?filter={"where":{"and":[{"memberId":"'+localStorage.getItem('currentUserId')+'"}]},"order":"createdon DESC"}&access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	console.log(this.availData = response.json());

          let i:any = 0;
          this.workingData = [];
          this.weekendData = [];
          this.specificData = [];
          this.workingAvail = 0;
          this.weekendAvail = 0;
          this.dateAvail = 0; 
          this.break = 0;
          this.breakweekend = 0;

          this.data = { 
            days: "working",      
            hoursfrom: '',
            hoursto: '',
            breakfrom: '',
            breakto: '',
            memberId: localStorage.getItem('currentUserId'),
            memberType: (localStorage.getItem('currentUserRole') == 'SALON' ? 'salon' : 'artist'),
           
            createdon: new Date()
          }

          this.dataweekend = { 
            days: "weekend",      
            hoursfrom: '',
            hoursto: '',
            breakfrom: '',
            breakto: '',
            memberId: localStorage.getItem('currentUserId'),
            memberType: (localStorage.getItem('currentUserRole') == 'SALON' ? 'salon' : 'artist'),
       
            createdon: new Date()
          }

          for(let index in this.availData){ 
            if(this.availData[index].days == "working") {
              this.workingAvail = 1; 
              this.workingData.id = this.availData[index].id;
             // this.workingData.hoursfrom = moment(this.availData[index].hoursfrom).format("hh:mm A");
             // this.workingData.hoursto =  moment(this.availData[index].hoursto).format("hh:mm A"); 

              this.workingData.hoursfrom = this.availData[index].hoursfrom;
              this.workingData.hoursto =  this.availData[index].hoursto; 

               // this.workingData.breakfrom = moment(this.availData[index].breakfrom).format("hh:mm A");
               // this.workingData.breakto =  moment(this.availData[index].breakto).format("hh:mm A"); 

                this.workingData.breakfrom = this.availData[index].breakfrom;
                this.workingData.breakto =  this.availData[index].breakto; 

                this.data = this.availData[index];
                 if(this.data.breakfrom != '' && this.data.breakto != ''){
                  this.break = 1;
                 } else {
                  this.break = 0;
                 }

            } else if(this.availData[index].days == "weekend") {
              this.weekendAvail = 1;                  
              this.weekendData.id = this.availData[index].id;
             // this.weekendData.hoursfrom = moment(this.availData[index].hoursfrom).format("hh:mm A");
             // this.weekendData.hoursto =  moment(this.availData[index].hoursto).format("hh:mm A"); 

              this.weekendData.hoursfrom = this.availData[index].hoursfrom;
              this.weekendData.hoursto =  this.availData[index].hoursto; 

              
               // this.weekendData.breakfrom = moment(this.availData[index].breakfrom).format("hh:mm A");
               // this.weekendData.breakto =  moment(this.availData[index].breakto).format("hh:mm A"); 


                this.weekendData.breakfrom = this.availData[index].breakfrom;
                this.weekendData.breakto =  this.availData[index].breakto; 

                this.dataweekend = this.availData[index];
                 if(this.dataweekend.breakfrom != '' && this.dataweekend.breakto != ''){
                  this.breakweekend = 1;
                 } else {
                  this.breakweekend = 0;
                 }

                
            } else if(this.availData[index].days == "specificDate") {     
              this.dateAvail = 1;  
              this.specificData[i] = [];   
              this.specificData[i].id = this.availData[index].id;
              this.specificData[i].date = moment(this.availData[index].date).format("DD MMMM YYYY");       
             // this.specificData[i].hoursfrom = moment(this.availData[index].hoursfrom).format("hh:mm A");
             // this.specificData[i].hoursto =  moment(this.availData[index].hoursto).format("hh:mm A"); 


              this.specificData[i].hoursfrom = this.availData[index].hoursfrom;
              this.specificData[i].hoursto =  this.availData[index].hoursto; 
              this.specificData[i].breakfrom = this.availData[index].breakfrom;
              this.specificData[i].breakto =  this.availData[index].breakto; 

              i=i+1;
            }   
                      
          }
          console.log(this.workingData, this.weekendData,this.specificData);
          $('.preloader').hide();
        }, error => {
	        console.log(JSON.stringify(error.json()));
	    });
  	}

    resetAvail(id){
      let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json');

      if(confirm("Are you sure you want to remove this availability?")) {
        $('.preloader').show(); 
        this.http.delete(API_URL+'/Artistavailabilities/'+id+'?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
          this.getAllAvailData();
        }, error => {
            console.log(JSON.stringify(error.json()));
        });
      }

    }

    onSave(data) {
        $('.preloader').show(); 
      let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json');

    
      if(new Date(this.am_pm_to_hours(data.hoursfrom)) > new Date(this.am_pm_to_hours(data.hoursto)) && data.hoursfrom != '' && data.hoursto != '') {
          $('.preloader').hide(); 
          this.toasterService.clear();	this.toasterService.pop('error', 'Time invalid', "For Work, End Time should always be greater than the Start Time"); 
          return;        
      }

      if(new Date(this.am_pm_to_hours(data.breakfrom)) > new Date(this.am_pm_to_hours(data.breakto)) && data.breakfrom!= '' && data.breakto != '') {
          $('.preloader').hide(); 
          this.toasterService.clear();	this.toasterService.pop('error', 'Time invalid', "For Break, End Time should always be greater than the Start Time"); 
          return;        
      }

      if(data.breakfrom == data.hoursfrom && data.breakto == data.hoursto  && data.hoursfrom!= '' && data.hoursto != '' && data.breakfrom!= '' && data.breakto != '' ) {
          $('.preloader').hide(); 
            this.toasterService.clear();	this.toasterService.pop('error', 'Time invalid', "Complete Work time is not available for break time. "); 
            return;        
        }
      
      if((new Date(this.am_pm_to_hours(data.breakfrom)) < new Date(this.am_pm_to_hours(data.hoursfrom)) || new Date(this.am_pm_to_hours(data.breakfrom)) > new Date(this.am_pm_to_hours(data.hoursto)) || new Date(this.am_pm_to_hours(data.breakto)) < new Date(this.am_pm_to_hours(data.hoursfrom)) || new Date(this.am_pm_to_hours(data.breakto)) > new Date(this.am_pm_to_hours(data.hoursto))) && data.hoursfrom!= '' && data.hoursto != '' && data.breakfrom!= '' && data.breakto != '' ) {
          $('.preloader').hide(); 
            this.toasterService.clear();	this.toasterService.pop('error', 'Time invalid', "Break Time must be in between Work Time"); 
            return;        
        }



      this.http.post(API_URL+'/Artistavailabilities?access_token='+ localStorage.getItem('currentUserToken'), data, options)
      .subscribe(response => {
          console.log(data);
          this.toasterService.clear();	this.toasterService.pop('success', 'Success', "Availability saved successfully"); 
          
          $(".closeModalButton").click();
          this.getAllAvailData();
      }, error => {
          console.log(JSON.stringify(error.json()));
      });
      
    }

    onUpdate(Id,data) {
        $('.preloader').show(); 
      let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json');

      if(new Date(this.am_pm_to_hours(data.hoursfrom)) > new Date(this.am_pm_to_hours(data.hoursto)) && data.hoursfrom != '' && data.hoursto != '') {
          $('.preloader').hide(); 
          this.toasterService.clear();	this.toasterService.pop('error', 'Time invalid', "For Work, End Time should always be greater than the Start Time"); 
          return;        
      }

      if(new Date(this.am_pm_to_hours(data.breakfrom)) > new Date(this.am_pm_to_hours(data.breakto)) && data.breakfrom!= '' && data.breakto != '') {
          $('.preloader').hide(); 
          this.toasterService.clear();	this.toasterService.pop('error', 'Time invalid', "For Break, End Time should always be greater than the Start Time"); 
          return;        
      }
      
       if(data.breakfrom == data.hoursfrom && data.breakto == data.hoursto  && data.hoursfrom!= '' && data.hoursto != '' && data.breakfrom!= '' && data.breakto != '' ) {
          $('.preloader').hide(); 
            this.toasterService.clear();	this.toasterService.pop('error', 'Time invalid', "Complete Work time is not available for break time. "); 
            return;        
        }
      
      
      if((new Date(this.am_pm_to_hours(data.breakfrom)) < new Date(this.am_pm_to_hours(data.hoursfrom)) || new Date(this.am_pm_to_hours(data.breakfrom)) > new Date(this.am_pm_to_hours(data.hoursto)) || new Date(this.am_pm_to_hours(data.breakto)) < new Date(this.am_pm_to_hours(data.hoursfrom)) || new Date(this.am_pm_to_hours(data.breakto)) > new Date(this.am_pm_to_hours(data.hoursto))) && data.hoursfrom!= '' && data.hoursto != '' && data.breakfrom!= '' && data.breakto != '' ) {
          $('.preloader').hide(); 
            this.toasterService.clear();	this.toasterService.pop('error', 'Time invalid', "Break Time must be in between Work Time"); 
            return;        
        }


      this.http.post(API_URL+'/Artistavailabilities/update?where={"id":"'+Id+'"}&access_token='+ localStorage.getItem('currentUserToken'), data, options)
      .subscribe(response => {
          this.toasterService.clear();	this.toasterService.pop('success', 'Success', "Availability updated successfully"); 
          
          $(".closeModalButton").click();
          this.getAllAvailData();
      }, error => {
          console.log(JSON.stringify(error.json()));
      });
      
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
