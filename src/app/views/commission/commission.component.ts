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
  templateUrl: 'commission.component.html',
   styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CommissionComponent {
	
  	private commissions: any;
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

		this.http.get(API_URL+'/Commissions?filter={"where":{"active":{"neq":0}}}&access_token='+localStorage.getItem('currentUserToken'), options)
		.subscribe(response => {      
			this.commissions = response.json();
			if( this.commissions.length == 0){
			 this.nocr = 0;
			}	

		}, error => {
			console.log(JSON.stringify(error.json()));
		});
    	
 	}
	delCommission(delId){
		if(confirm("Are you sure?")){
		
			let options = new RequestOptions();
			options.headers = new Headers();
			options.headers.append('Content-Type', 'application/json');
			options.headers.append('Accept', 'application/json');

			this.http.post(API_URL+'/Commissions/update?where={"id":"'+ delId.id +'"}&access_token='+ localStorage.getItem('currentUserToken'), {"active":0} ,options)    
			.subscribe(response => {
				this.toasterService.pop('success', 'Success ', "Commission Record deleted successfully.");
				const index: number = this.commissions.indexOf(delId);
				if (index !== -1) {
					this.commissions.splice(index, 1);
				} 
				if( this.commissions.length == 0){
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
