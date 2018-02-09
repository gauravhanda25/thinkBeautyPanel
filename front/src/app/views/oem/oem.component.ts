import { Component } from '@angular/core';
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
  templateUrl: 'oem.component.html',
   styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
})
export class OemComponent {
	
  	private users: any;
    private delparam: any;
	private nooem: any;
	private toasterService: ToasterService;

    public toasterconfig : ToasterConfig =
      new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
      });
	public filterQuery = '';
    constructor(private router:Router, private http: Http, private activatedRoute: ActivatedRoute, toasterService: ToasterService ) { 
		this.toasterService = toasterService;
		
		this.nooem = 1;
		
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

		this.http.get(API_URL+'/Oems?filter={"include" : ["brands", "centers", "mrs"]}&access_token='+localStorage.getItem('currentUserToken'), options)
		.subscribe(response => {      
			this.users = response.json();       
			 
			
			 if(localStorage.getItem('noticemessage') != null){
                console.log(localStorage.getItem('noticemessage'));

                if(localStorage.getItem('noticemessage') == "oemadd") {
                    this.toasterService.pop('success', 'Success ', "OEMS Record added successfully."); 
                } else if(localStorage.getItem('noticemessage') == "oemupdate") {
                    this.toasterService.pop('success', 'Success ', "OEMS Record updated successfully.");
                }  else if(localStorage.getItem('noticemessage') == "oemdelete") {
                    this.toasterService.pop('success', 'Success ', "OEMS Record deleted successfully.");
                }

                localStorage.setItem('noticemessage', null);
            }

		}, error => {
			console.log(JSON.stringify(error.json()));
		});
    	
 	}
	deloems(delId){
		console.log(delId);
		if(confirm("Are you sure?")){
		
			let options = new RequestOptions();
			options.headers = new Headers();
			options.headers.append('Content-Type', 'application/json');
			options.headers.append('Accept', 'application/json');

			this.http.delete(API_URL+'/Oems/'+delId.id+'?access_token='+ localStorage.getItem('currentUserToken'), options)
			.subscribe(response => {
				console.log(response.json()+'in funct');
				// this.router.navigate(['oem']);	
				 localStorage.setItem('noticemessage', 'oemdelete');
				 //this.router.navigate(['oem']);	
				const index: number = this.users.indexOf(delId);
				console.log(index);
				if (index !== -1) {
					this.users.splice(index, 1);
				}   				 
			}, error => {
				console.log(JSON.stringify(error.json()));
			});
		} else {
				return false;
		}
	}

}
