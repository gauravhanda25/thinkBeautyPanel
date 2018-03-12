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

// Toastr
import { ToasterModule, ToasterService, ToasterConfig, Toast }  from 'angular2-toaster/angular2-toaster';

@Component({
	templateUrl: 'addartistavail.component.html',
	styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
	encapsulation: ViewEncapsulation.None
})

@Injectable()
export class AddartistavailComponent {
	
	private data: any;
  	private editparam: any;
  	private week :any = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  	private weekdayno :any = [0,1,2,3,4,5,6];
  	private break: any = [];
  	private day: any = [];

  	private availData:any;
    private closedChecked:any = [];

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
        closed: [],
        day: [],      
        hoursfrom:[],
        hoursto: [],
        artistId: localStorage.getItem('currentUserId'),
        breakfrom: [],
        breakto: []
      }


      const reqUrl = this.router.url;
      if(reqUrl == "/availability/addartistavail") {
        this.data.serviceFor = "home";
      } else if(reqUrl == "/gccavailability/addartistavail") {
        this.data.serviceFor = "gcc";
      }



    	this.editparam = {
    		id: '',
    		action: 'add'
    	}

    	for(let no in this.weekdayno){
    		this.break[no] = 0;
    		this.day[no] = 0;  		
	    	this.data.hoursfrom[no] = '';
	    	this.data.hoursto[no] =  '';
	    	this.data.breakfrom[no] =  '';
	    	this.data.breakto[no] = '';
    	}


	    this.getAllAvailData();

  	}

  	showBreakSlots(dayno){
  		this.break[dayno] = 1;
  	}

  	removeBreakSlots(dayno){
  		this.break[dayno] = 0;
  		this.data.breakfrom[dayno] = '';
  		this.data.breakto[dayno] = '';

  	}

  	showDaySlots(dayno){
  		if(this.data.closed[dayno]){
  			this.day[dayno] = 1;
  		} else {
  			this.day[dayno] = 0;
  			this.break[dayno] = 0;
  			this.data.hoursfrom[dayno] = '';
	    	this.data.hoursto[dayno] =  '';
	    	this.data.breakfrom[dayno] =  '';
	    	this.data.breakto[dayno] = '';
  		}
  	}

  	onSave() {
  		let options = new RequestOptions();
	    options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        let savedata:any;
        for(let dayno in this.weekdayno) {
        	savedata = {
        		closed: (this.data.closed[dayno]? "no" : "yes") ,
  	    		day: this.week[dayno] ,  
  	    		dayindex: dayno,		
  	    		hoursfrom: this.data.hoursfrom[dayno],
  	    		hoursto: this.data.hoursto[dayno],
  	    		artistId: localStorage.getItem('currentUserId'),
  	    		breakfrom: this.data.breakfrom[dayno],
  	    		breakto: this.data.breakto[dayno],
            serviceFor: this.data.serviceFor
        	}
        	console.log(savedata);

	    	this.http.post(API_URL+'/Artistavailabilities?access_token='+ localStorage.getItem('currentUserToken'), savedata, options)
	      .subscribe(response => {
          if(dayno == "6") {
				    this.toasterService.pop('success', 'Success', "Availability saved successfully"); 

            this.getAllAvailData(); 
          }  		
		    }, error => {
		        console.log(JSON.stringify(error.json()));
		    });
		}
  	}

  	onUpdate() {
  		let options = new RequestOptions();
	    options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        let savedata:any;

        for(let dayno in this.weekdayno) {
        	savedata = {
        		closed: (this.data.closed[dayno]? "no" : "yes") ,
  	    		day: this.week[dayno],  	  
  	    		dayindex: dayno,			
  	    		hoursfrom: this.data.hoursfrom[dayno],
  	    		hoursto: this.data.hoursto[dayno],
  	    		artistId: localStorage.getItem('currentUserId'),
  	    		breakfrom: this.data.breakfrom[dayno],
  	    		breakto: this.data.breakto[dayno],
            serviceFor: this.data.serviceFor
        	}

	    	this.http.post(API_URL+'/Artistavailabilities/update?where=%7B%22and%22%3A%5B%7B%22artistId%22%3A%22'+localStorage.getItem('currentUserId')+'%22%7D%2C%7B%22serviceFor%22%3A%22'+savedata.serviceFor+'%22%7D%2C%7B%22day%22%3A%22'+savedata.day+'%22%7D%5D%7D&access_token='+ localStorage.getItem('currentUserToken'), savedata, options)
        .subscribe(response => {
				  if(dayno == "6") {
            this.toasterService.pop('success', 'Success', "Availability updated successfully"); 

            this.getAllAvailData();
          }
		    }, error => {
		        console.log(JSON.stringify(error.json()));
		    });
		  } 
  	}

  	getAllAvailData() {
  		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

    	this.http.get(API_URL+'/Artistavailabilities?filter={"where":{"and":[{"artistId":"'+localStorage.getItem('currentUserId')+'"},{"serviceFor":"'+this.data.serviceFor+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	console.log(this.availData = response.json());

          for(let index in this.availData){            
            this.data.closed[this.availData[index].dayindex] = this.availData[index].closed;
            this.data.hoursfrom[this.availData[index].dayindex] = this.availData[index].hoursfrom;
            this.data.hoursto[this.availData[index].dayindex] =  this.availData[index].hoursto;
            this.data.breakfrom[this.availData[index].dayindex] =  this.availData[index].breakfrom;
            this.data.breakto[this.availData[index].dayindex] = this.availData[index].breakto;
            
            this.showDaySlots(this.availData[index].dayindex);

            if(this.data.breakfrom[this.availData[index].dayindex] != ''){
               this.showBreakSlots(this.availData[index].dayindex);
            } else {
               this.removeBreakSlots(this.availData[index].dayindex);
            }
          }

          console.log(this.data);

        	if(response.json().length != 0) {
        		this.editparam.action = "edit";
        	}

        }, error => {
	        console.log(JSON.stringify(error.json()));
	    });
  	}
}
