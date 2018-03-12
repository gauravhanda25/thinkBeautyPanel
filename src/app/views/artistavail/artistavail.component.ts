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

  private workingAvail:any = 0;
  private weekendAvail:any = 0;
  private dateAvail:any = 0;


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

          for(let index in this.availData){ 
            if(this.availData[index].days == "working") {
              this.workingAvail = 1; 
              this.workingData.hoursfrom = moment(this.availData[index].hoursfrom).format("hh:mm A");
              this.workingData.hoursto =  moment(this.availData[index].hoursto).format("hh:mm A"); 
            } else if(this.availData[index].days == "weekend") {
              this.weekendAvail = 1;             
              this.weekendData.hoursfrom = moment(this.availData[index].hoursfrom).format("hh:mm A");
              this.weekendData.hoursto =  moment(this.availData[index].hoursto).format("hh:mm A"); 
            } else if(this.availData[index].days == "specificDate") {     
              this.dateAvail = 1;  
              this.specificData[i] = [];   
              this.specificData[i].date = moment(this.availData[index].date).format("DD/MM/YYYY");       
              this.specificData[i].hoursfrom = moment(this.availData[index].hoursfrom).format("hh:mm A");
              this.specificData[i].hoursto =  moment(this.availData[index].hoursto).format("hh:mm A"); 

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
}
