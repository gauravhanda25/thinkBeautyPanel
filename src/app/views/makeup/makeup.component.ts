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
import { ToasterModule, ToasterService, ToasterConfig }  from 'angular2-toaster/angular2-toaster';
@Component({
	templateUrl: 'makeup.component.html',
	styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MakeupComponent {
	private data: any;
    private delparam: any;
	private nomakeup: any;
	private toasterService: ToasterService;

    public toasterconfig : ToasterConfig =
      new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
      });
	public filterQuery = '';
    constructor(private router:Router, private http: Http, private activatedRoute: ActivatedRoute, toasterService: ToasterService ) { 
		this.toasterService = toasterService;
		
		this.nomakeup = 0;
		
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

		this.http.get(API_URL+'/Makeups?access_token='+localStorage.getItem('currentUserToken'), options)
		.subscribe(response => {      
			this.data = response.json();       
			if( this.data.length == 0) {
			 this.nomakeup = 0;
			} else {
			 this.nomakeup = 1;
			}
		}, error => {
			console.log(JSON.stringify(error.json()));
		});
    	
 	}
	delmakeup(delId){
		//console.log(delId);

		$('.preloader').show();
		if(confirm("Are you sure?")){
		
			let options = new RequestOptions();
			options.headers = new Headers();
			options.headers.append('Content-Type', 'application/json');
			options.headers.append('Accept', 'application/json');

			this.http.delete(API_URL+'/Makeups/'+delId.id+'?access_token='+ localStorage.getItem('currentUserToken'), options)
			.subscribe(response => {		
				this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Makeup Record deleted successfully.");
				$('.preloader').hide();
				const index: number = this.data.indexOf(delId);
				if (index !== -1) {
					this.data.splice(index, 1);
				}  
				if( this.data.length == 0){
				 this.nomakeup = 0;
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
