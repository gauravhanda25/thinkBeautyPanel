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
  templateUrl: 'fixedcharge.component.html',
   styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FixedchargeComponent {
	
  	private fixedcharges: any;
    private delparam: any;
	private nocr: any;

	private toasterService: ToasterService;
    public toasterconfig : ToasterConfig =
      new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
      });

	public filterQuery = '';

    constructor(private router:Router, private http: Http, private activatedRoute: ActivatedRoute, toasterService: ToasterService ) { 
		this.toasterService = toasterService;
		
		this.nocr = 1;
		
        this.delparam = {
            id: '',
            action: 'add'
        }

        this.activatedRoute.params.subscribe((params) => {
            let id = params['id'];
            this.delparam.id = id;
        });

        let options = new RequestOptions();
		options.headers = new Headers();
		options.headers.append('Content-Type', 'application/json');
		options.headers.append('Accept', 'application/json');

		this.http.get(API_URL+'/Fixedcharges?filter={"where":{"and":[{"active":{"neq":0}},{"memberId":"'+localStorage.getItem('currentUserId')+'"}]}}&access_token='+localStorage.getItem('currentUserToken'), options)
		.subscribe(response => {   
			console.log(response.json());   
			 if(response.json().length !=0) {
				this.fixedcharges = response.json();
                for(let i=0; i< this.fixedcharges.length; i++ ) {
					if(this.fixedcharges[i].created_on != '' && this.fixedcharges[i].created_on != undefined) {
		                this.fixedcharges[i].created_on = moment(this.fixedcharges[i].created_on).format('DD MMMM YYYY');
		            } else {
		               this.fixedcharges[i].created_on = ''; 
		            }
		        }
		    } else {
			 	this.nocr = 0;
		    }

		}, error => {
			console.log(JSON.stringify(error.json()));
		});
    	
 	}
	delfixedcharge(delId){
		if(confirm("Are you sure you want to remove this fixedcharge?")){
		
			let options = new RequestOptions();
			options.headers = new Headers();
			options.headers.append('Content-Type', 'application/json');
			options.headers.append('Accept', 'application/json');

			this.http.post(API_URL+'/Fixedcharges/update?where={"id":"'+ delId.id +'"}&access_token='+ localStorage.getItem('currentUserToken'), {"active":0} ,options)    
			.subscribe(response => {
				this.toasterService.pop('success', 'Success ', "Fixed Charge Record deleted successfully.");
				const index: number = this.fixedcharges.indexOf(delId);
				if (index !== -1) {
					this.fixedcharges.splice(index, 1);
				} 
				if( this.fixedcharges.length == 0){
					 this.nocr = 0;
					}		
			}, error => {
				console.log(JSON.stringify(error.json()));
			});

		} else {
				return false;
		}
	}

}
