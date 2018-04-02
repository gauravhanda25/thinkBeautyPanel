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
import { ToasterModule, ToasterService, ToasterConfig }  from 'angular2-toaster/angular2-toaster';
@Component({
	templateUrl: 'artistgcc.component.html',
	styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ArtistgccComponent {

	private data: any;
	private editparam: any;
  private gccData:any;
  private gcclocations:any;
  private noGCC:any = 1;

  private serviceFor:any;
  private currency:any = localStorage.getItem('currentUserCurrency');

	private toasterService: ToasterService;
	public toasterconfig : ToasterConfig =
	  new ToasterConfig({
		tapToDismiss: true,
		timeout: 5000
	  });
	  
	  
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
		
    	this.editparam = {
    		id: '',
    		action: 'add'
    	}

      let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json');

      this.http.get(API_URL+'/Artistgcclocations?access_token='+ localStorage.getItem('currentUserToken'), options)
      .subscribe(response => {
         this.gcclocations = response.json();

      }, error => {
          console.log(JSON.stringify(error.json()));
      });


      this.getAllgccData();

  	}
  	
    getAllgccData() {
      let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json');
 
      this.gccData = [];
      this.noGCC = 1;

      this.http.get(API_URL+'/Artistgcc?filter={"where":{"and":[{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"order":"createdon DESC"}&access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
          console.log(this.gccData = response.json());

          if(response.json().length != 0) {
            for(let index in this.gccData){ 
              this.gccData[index].starton = moment(this.gccData[index].starton).format("DD/MM/YYYY");
              this.gccData[index].endon = moment(this.gccData[index].endon).format("DD/MM/YYYY");
            }

            this.noGCC = 0;
          }
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

      if(confirm("Are you sure you want to remove this GCC availability?")){
        $('.preloader').show(); 
        this.http.delete(API_URL+'/Artistgcc/'+id+'?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
          this.getAllgccData();
        }, error => {
            console.log(JSON.stringify(error.json()));
        });
      }
      

    }
}
