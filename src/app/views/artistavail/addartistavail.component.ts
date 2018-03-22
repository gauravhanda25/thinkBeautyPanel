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

// Toastr
import { ToasterModule, ToasterService, ToasterConfig, Toast }  from 'angular2-toaster/angular2-toaster';

@Component({
	templateUrl: 'addartistavail.component.html',
	styleUrls: ['../../../scss/vendors/toastr/toastr.scss',   '../../../scss/vendors/bs-datepicker/bs-datepicker.scss'],
	encapsulation: ViewEncapsulation.None
})

@Injectable()
export class AddartistavailComponent {
	
	  private data: any;
  	private editparam: any; 
    public bsStartValue = new Date();
    private today = new Date();
    private break: any = 0;
    private currency:any = localStorage.getItem('currentUserCurrency');

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

		this.toasterService = toasterService;
		
      this.data = { 
        days: '',      
        hoursfrom: '',
        hoursto: '',
        breakfrom: '',
        breakto: '',
        artistId: localStorage.getItem('currentUserId'),
        date: '',
        createdon: new Date()
      }


      const reqUrl = this.router.url;
      if(reqUrl == "/schedule/work/addartistworking") {
        this.data.days = "working";
      } else if(reqUrl == "/schedule/work/addartistweekend") {
        this.data.days = "weekend";
      } else if(reqUrl == "/schedule/work/addartistspecificdate") {
        this.data.days = "specificDate";
      }  

     /*  else if(reqUrl == "/schedule/work/addartistbreak/weekend") {
        this.data.days = "weekend";
        this.breakadd = 1;
      } else if(reqUrl == "/schedule/work/addartistbreak/working") {
        this.data.days = "working";
        this.breakadd = 1;
      } */



    	this.editparam = {
    		id: '',
    		action: 'add'
    	}

      this.activatedRoute.params.subscribe((params) => {
          let id = params['id'];
          this.editparam.id = id;
      });

      let options = new RequestOptions();
      options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');


      if(this.editparam.id != undefined){
        $('.preloader').show(); 
        this.http.get(API_URL+'/Artistavailabilities?filter={"where":{"and":[{"id":"'+this.editparam.id+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(res => {
           this.data = res.json()[0];
           this.editparam.action = "edit";
           
           if(this.data.breakfrom != '' && this.data.breakto != ''){
            this.break = 1;
           } else {
            this.break = 0;
           }
           $('.preloader').hide(); 
        }, error => {
            console.log(JSON.stringify(error.json()));
        });

      }
        $('.preloader').hide(); 


  	}

    showBreakSlots() {
      this.break = 1;
    }

    removeBreakSlots() {
      this.break = 0;
      this.data.breakfrom = '';
      this.data.breakto = '';
    }

  	onSave() {
        $('.preloader').show(); 
  		let options = new RequestOptions();
	    options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json');

      this.data.date = moment(this.data.date).format('YYYY-MM-DD');

      this.http.get(API_URL+'/Artistavailabilities?filter={"where":{"and":[{"artistId":"'+localStorage.getItem('currentUserId')+'"},{"date":"'+this.data.date+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
      .subscribe(response => {
          console.log(response.json());
        if(response.json().length != 0) { 
          $('.preloader').hide(); 
          this.toasterService.pop('error', 'Date Invalid', "Availability for this date already added."); 
          return; 
        } 

        if(new Date(this.am_pm_to_hours(this.data.hoursfrom)) > new Date(this.am_pm_to_hours(this.data.hoursto)) && this.data.hoursfrom != '' && this.data.hoursto != '') {
          $('.preloader').hide(); 
          this.toasterService.pop('error', 'Time invalid', "Work End Time is less than the Work Start Time"); 
            return;        
        }

        if(new Date(this.am_pm_to_hours(this.data.breakfrom)) > new Date(this.am_pm_to_hours(this.data.breakto)) && this.data.breakfrom!= '' && this.data.breakto != '') {
          $('.preloader').hide(); 
            this.toasterService.pop('error', 'Time invalid', "Break End Time is less than the Break Start Time"); 
            return;        
        }


        this.http.post(API_URL+'/Artistavailabilities?access_token='+ localStorage.getItem('currentUserToken'), this.data, options)
        .subscribe(response => {
            this.toasterService.pop('success', 'Success', "Availability saved successfully"); 
            this.router.navigate(['schedule/work']);
        }, error => {
            console.log(JSON.stringify(error.json()));
        });
       

      }, error => {
          console.log(JSON.stringify(error.json()));
      });


      
      

      /* } else {
        delete this.data.hoursfrom;
        delete this.data.hoursto;

        this.http.post(API_URL+'/Artistavailabilities/update?where={"and":[{"artistId":"'+localStorage.getItem('currentUserId')+'"},{"days":"'+this.data.days+'"}]}&access_token='+ localStorage.getItem('currentUserToken'), this.data, options)
        .subscribe(response => {
            this.toasterService.pop('success', 'Success', "Break saved successfully"); 
            this.router.navigate(['schedule/work']);
        }, error => {
            console.log(JSON.stringify(error.json()));
        });
      }  */
    	
	  }

    onUpdate() {
        $('.preloader').show(); 
      let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json');


      this.data.date = moment(this.data.date).format('YYYY-MM-DD');
      
      this.http.get(API_URL+'/Artistavailabilities?filter={"where":{"and":[{"artistId":"'+localStorage.getItem('currentUserId')+'"},{"date":"'+this.data.date+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
      .subscribe(response => {
        console.log(response.json());
        if(response.json().length != 0) {
          $('.preloader').hide(); 
          this.toasterService.pop('error', 'Date Invalid', "Availability for this date already added."); 
          return; 
        } 
        if(new Date(this.am_pm_to_hours(this.data.hoursfrom)) > new Date(this.am_pm_to_hours(this.data.hoursto)) && this.data.hoursfrom != '' && this.data.hoursto != '') {
          $('.preloader').hide(); 
            this.toasterService.pop('error', 'Time invalid', "Work End Time is less than the Work Start Time"); 
            return;        
        }

        if(new Date(this.am_pm_to_hours(this.data.breakfrom)) > new Date(this.am_pm_to_hours(this.data.breakto)) && this.data.breakfrom!= '' && this.data.breakto != '') {
          $('.preloader').hide(); 
            this.toasterService.pop('error', 'Time invalid', "Break End Time is less than the Break Start Time"); 
            return;        
        }



        this.http.post(API_URL+'/Artistavailabilities/update?where={"id":"'+this.editparam.id+'"}&access_token='+ localStorage.getItem('currentUserToken'), this.data, options)
        .subscribe(response => {
            this.toasterService.pop('success', 'Success', "Availability updated successfully"); 
            this.router.navigate(['schedule/work']);
        }, error => {
            console.log(JSON.stringify(error.json()));
        });
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
