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
import { ToasterModule, ToasterService, ToasterConfig }  from 'angular2-toaster/angular2-toaster';
@Component({
	templateUrl: 'artistavail.component.html',
	styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ArtistavailComponent {
	  private data: any;
  	private editparam: any;
  	private week :any = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
  	private weekdayno :any = [0,1,2,3,4,5,6];
  	
  	private availData:any;
    private vacationData:any;

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
      this.getAllVacationData();

  	}

  	getAllAvailData() {
  		let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

    	this.http.get(API_URL+'/Artistavailabilities?filter={"where":{"or":[{"artistId":"'+localStorage.getItem('currentUserId')+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
        	console.log(this.availData = response.json());
        	this.data = [];

          for(let index in this.availData){  
          	this.data[this.availData[index].dayindex] = [];          
            this.data[this.availData[index].dayindex].closed = this.availData[index].closed;
            this.data[this.availData[index].dayindex].hoursfrom = this.availData[index].hoursfrom;
            this.data[this.availData[index].dayindex].hoursto =  this.availData[index].hoursto;
            this.data[this.availData[index].dayindex].breakfrom =  this.availData[index].breakfrom;
            this.data[this.availData[index].dayindex].breakto = this.availData[index].breakto;
           
          }

          console.log(this.data);

        	if(response.json().length != 0) {
        		this.editparam.action = "edit";
        	}

        }, error => {
	        console.log(JSON.stringify(error.json()));
	    });
  	}

    getAllVacationData() {
      let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

      this.http.get(API_URL+'/Artistvacations?filter={"where":{"or":[{"artistId":"'+localStorage.getItem('currentUserId')+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
          console.log(this.vacationData = response.json());

        }, error => {
          console.log(JSON.stringify(error.json()));
      });
    }
}
