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
import * as $ from 'jquery';

// Toastr
import { ToasterModule, ToasterService, ToasterConfig, Toast }  from 'angular2-toaster/angular2-toaster';

@Component({
	templateUrl: 'addartistgcc.component.html',

	styleUrls: ['../../../scss/vendors/toastr/toastr.scss',   '../../../scss/vendors/bs-datepicker/bs-datepicker.scss'],
	encapsulation: ViewEncapsulation.None
})

@Injectable()
export class AddartistgccComponent {
	
	  private data: any;
  	private editparam: any;
    private gcclocations:any;
    private today = new Date();
    private currency:any = localStorage.getItem('currentUserCurrency');

  	//private day: any = 1;

    public bsStartValue = new Date();
    public bsEndValue = new Date();

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

     	this.data = { 
    		allday: 'yes', 
        starton: '',
       // starttime: '',
        endon: '',
       // endtime: '',
       gcclocation: '',
    		artistId: localStorage.getItem('currentUserId'),
        createdon: new Date()
    	}

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

      this.http.get(API_URL+'/Artistgcclocations?access_token='+ localStorage.getItem('currentUserToken'), options)
      .subscribe(response => {
         this.gcclocations = response.json();

      }, error => {
          console.log(JSON.stringify(error.json()));
      });

      if(this.editparam.id != undefined){

    
        $('.preloader').show(); 
        this.http.get(API_URL+'/Artistgcc?filter={"where":{"and":[{"id":"'+this.editparam.id+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(gccres => {
           this.data = gccres.json()[0];
           this.editparam.action = "edit";

    
        $('.preloader').hide(); 
        }, error => {
            console.log(JSON.stringify(error.json()));
        });

      }
    
        $('.preloader').hide(); 
      
  	}


  	onSave() {
    
        $('.preloader').show(); 
  		let options = new RequestOptions();
	    options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

	    	this.http.post(API_URL+'/Artistgcc?access_token='+ localStorage.getItem('currentUserToken'), this.data, options)
	      .subscribe(response => {
				    this.toasterService.pop('success', 'Success', "GCC Availability saved successfully"); 
            this.router.navigate(['schedule/gcc']);

		    }, error => {
		        console.log(JSON.stringify(error.json()));
		    });
  	}

    onUpdate() {
    
        $('.preloader').show(); 
      let options = new RequestOptions();
      options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        this.http.post(API_URL+'/Artistgcc/update?where={"id":"'+this.editparam.id+'"}&access_token='+ localStorage.getItem('currentUserToken'), this.data, options)
        .subscribe(response => {
            this.toasterService.pop('success', 'Success', "GCC Availability updated successfully"); 
            this.router.navigate(['schedule/gcc']);

        }, error => {
            console.log(JSON.stringify(error.json()));
        });
    }
  	
}
