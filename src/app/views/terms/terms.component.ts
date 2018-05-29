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
  templateUrl: 'terms.component.html',
   styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TermsComponent {
	
  	private terms: any = [];
    private delparam: any;
	private nocr: any;
    private use_url: any;
    private pagetype:any;

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

		const reqUrl = this.router.url;
		console.log(this.router.url);
        if(reqUrl === '/terms/cancellation')  {
             this.pagetype = "cancellation";
        } else if(reqUrl === '/terms/booking') {
             this.pagetype = "booking";            
        } else if(reqUrl === '/terms/userreg') {
             this.pagetype = "userreg";            
        } else if(reqUrl === '/terms/artistreg') {
             this.pagetype = "artistreg";            
        } 


        this.terms = [];
		this.http.get(API_URL+'/StaticPages?filter={"where":{"pagetype":"'+this.pagetype+'","active":{"neq":0}}}&access_token='+localStorage.getItem('currentUserToken'), options)
		.subscribe(response => {   
			console.log(response.json());   
			 if(response.json().length !=0) {
				this.terms = response.json();
                for(let i=0; i< this.terms.length; i++ ) {
					if(this.terms[i].created_on != '' && this.terms[i].created_on != undefined) {
		                this.terms[i].created_on = moment(this.terms[i].created_on).format('DD MMMM YYYY');
		            } else {
		               this.terms[i].created = ''; 
		            }
		        }
		    } else {
			 	this.nocr = 0;
		    }

		}, error => {
			console.log(JSON.stringify(error.json()));
		});
    	
 	}
	delTerms(delId){
		$('.preloader').show();
		if(confirm("Are you sure you want to remove these terms and conditions?")){
		
			let options = new RequestOptions();
			options.headers = new Headers();
			options.headers.append('Content-Type', 'application/json');
			options.headers.append('Accept', 'application/json');

			this.http.post(API_URL+'/StaticPages/update?where={"id":"'+ delId.id +'"}&access_token='+ localStorage.getItem('currentUserToken'), {"active":0} ,options)    
			.subscribe(response => {
				this.toasterService.pop('success', 'Success ', "Terms and Conditions Record deleted successfully.");
				$('.preloader').hide();
				const index: number = this.terms.indexOf(delId);
				if (index !== -1) {
					this.terms.splice(index, 1);
				} 
				if( this.terms.length == 0){
					 this.nocr = 0;
					}		
			}, error => {
				console.log(JSON.stringify(error.json()));
			});

		} else {
				$('.preloader').hide();
				return false;
		}
	}

}
