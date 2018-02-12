import { Component, ViewEncapsulation } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Injectable, Inject} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { RouterModule, Routes, Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { API_URL } from '../../globals';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

// Toastr
import { ToasterModule, ToasterService, ToasterConfig }  from 'angular2-toaster/angular2-toaster';

@Component({
  templateUrl: 'resetpwd.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})

@Injectable()
export class ResetpwdComponent {
	
  	private data: any;
  	private id: any;
  	private token: any;


    private toasterService: ToasterService;

    public toasterconfig : ToasterConfig =
      new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
      });

	constructor(@Inject(Http) private http: Http, @Inject(Router)private router:Router, @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute, toasterService: ToasterService) {
	  	this.data = {
	  	  id:'',
	      newPassword:'',
	      confirmpassword:'',
	      token : ''
	    };

     	this.toasterService = toasterService;

	    this.activatedRoute.params.subscribe((params) => {
	        this.id = params.id;
	        this.token = params.token;
	    });

	  }


	 onSubmit() {

	 	if(this.data.newPassword == this.data.confirmpassword) {
	 		//this.data.newPassword = btoa(this.data.newPassword);  // encrypt to base64

		  	this.http.post(API_URL+'/Members/reset-password' +'?access_token='+ this.token, this.data)
	        .subscribe(response => {   
	            this.toasterService.pop('success', 'Success', "Password Reset Successfully.");
	     		this.router.navigate(['login']);
          	}, error => {
          		console.log(JSON.stringify(error.json()));
				if(error.json().isTrusted){
					this.toasterService.pop('error', 'Error ', "API not working.");
				} else {				
                	this.toasterService.pop('error', 'Error ', error.json().error.message);
                }
          	});
		} else {
            this.toasterService.pop('error', 'Information Mismatch ', "Password and confirm password doesn't match");
		}
	}
}
