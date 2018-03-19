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
	templateUrl: 'addartistvacation.component.html',

	styleUrls: ['../../../scss/vendors/toastr/toastr.scss',   '../../../scss/vendors/bs-datepicker/bs-datepicker.scss'],
	encapsulation: ViewEncapsulation.None
})

@Injectable()
export class AddartistvacationComponent {
	
	  private data: any;
  	private editparam: any;
    private today = new Date();

  	//private day: any = 1;

    public bsStartValue = new Date();
    public bsEndValue = new Date();

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

     	this.data = { 
    		allday: 'yes', 
        starton: '',
       // starttime: '',
        endon: '',
       // endtime: '',
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


      if(this.editparam.id != undefined){
        this.http.get(API_URL+'/Artistvacations?filter={"where":{"and":[{"id":"'+this.editparam.id+'"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(vacationres => {
           this.data = vacationres.json()[0];
           this.editparam.action = "edit";

        }, error => {
            console.log(JSON.stringify(error.json()));
        });

      }

   	

  	}


  	onSave() {
  		let options = new RequestOptions();
	    options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

	    	this.http.post(API_URL+'/Artistvacations?access_token='+ localStorage.getItem('currentUserToken'), this.data, options)
	      .subscribe(response => {
				    this.toasterService.pop('success', 'Success', "Vacation Time saved successfully"); 
            this.router.navigate(['schedule/vacation']);

		    }, error => {
		        console.log(JSON.stringify(error.json()));
		    });
  	}

     onUpdate() {
      let options = new RequestOptions();
      options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        this.http.post(API_URL+'/Artistvacations/update?where={"id":"'+this.editparam.id+'"}&access_token='+ localStorage.getItem('currentUserToken'), this.data, options)
        .subscribe(response => {
            this.toasterService.pop('success', 'Success', "Vacation Time updated successfully"); 
            this.router.navigate(['schedule/vacation']);

        }, error => {
            console.log(JSON.stringify(error.json()));
        });
    }

  	
}
