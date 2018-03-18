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

// Toastr
import { ToasterModule, ToasterService, ToasterConfig }  from 'angular2-toaster/angular2-toaster';
@Component({
	templateUrl: 'artistavail.component.html',
	styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ArtistavailComponent {

	private data: any;
	private editparam: any;
	private workingdays :any = ['Sunday','Monday','Tuesday','Wednesday','Thursday'];
	private workingdayno :any = [0,1,2,3,4];
  private weekenddays :any = ['Friday','Saturday'];
  private weekenddayno :any = [0,1];
	
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


	private toasterService: ToasterService;
	public toasterconfig : ToasterConfig =
	  new ToasterConfig({
		tapToDismiss: true,
		timeout: 1000
	  });
	  
	  
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
		
    	this.editparam = {
    		id: '',
    		action: 'add'
    	}

      this.getAllAvailData();

  	}

  	getAllAvailData() {
  		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

    	   this.http.get(API_URL+'/Artistavailabilities?filter={"where":{"and":[{"artistId":"'+localStorage.getItem('currentUserId')+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	console.log(this.availData = response.json());

          let i:any = 0;
          this.workingData = [];
          this.weekendData = [];
          this.workingAvail = 0;
          this.weekendAvail = 0;
          this.dateAvail = 0; 

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
                
            } else if(this.availData[index].days == "specificDate") {     
              this.dateAvail = 1;  
              this.specificData[i] = [];   
              this.specificData[i].id = this.availData[index].id;
              this.specificData[i].date = moment(this.availData[index].date).format("DD/MM/YYYY");       
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
        	if(response.json().length != 0) {
        		this.editparam.action = "edit";
        	}
        }, error => {
	        console.log(JSON.stringify(error.json()));
	    });
  	}

    resetAvail(id){
      let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json');

      if(confirm("Are you sure?")) {
        this.http.delete(API_URL+'/Artistavailabilities/'+id+'?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
          this.getAllAvailData();
        }, error => {
            console.log(JSON.stringify(error.json()));
        });
      }

    }
}
