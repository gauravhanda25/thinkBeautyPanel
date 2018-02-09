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

@Component({
  templateUrl: 'autoGroup.component.html'
})
export class AutoGroupComponent {
	
  	private users: any;
    private delparam: any;
	private noautogroup: any;
	public filterQuery = '';
    constructor(private router:Router, private http: Http, private activatedRoute: ActivatedRoute ) { 
		this.noautogroup = 1;
        this.delparam = {
            id: '',
            action: 'add'
        }

        this.activatedRoute.params.subscribe((params) => {
            let id = params['id'];
            this.delparam.id = id;
        });

        if(this.delparam.id != undefined) {
            let options = new RequestOptions();
            options.headers = new Headers();
            options.headers.append('Content-Type', 'application/json');
            options.headers.append('Accept', 'application/json');

            this.http.delete(API_URL+'/AutoGroups/'+ this.delparam.id +'?access_token='+ localStorage.getItem('currentUserToken'), options)
            .subscribe(response => {
                console.log(response.json()); 
                let options = new RequestOptions();
                options.headers = new Headers();
                options.headers.append('Content-Type', 'application/json');
                options.headers.append('Accept', 'application/json');

                this.http.get(API_URL+'/AutoGroups?access_token='+localStorage.getItem('currentUserToken'), options)
                .subscribe(response => {
                    console.log(response.json());       
                    this.users = response.json();       
                       
                }, error => {
                    console.log(JSON.stringify(error.json()));
                });  
            }, error => {
                console.log(JSON.stringify(error.json()));
            });
        } else {
            let options = new RequestOptions();
            options.headers = new Headers();
            options.headers.append('Content-Type', 'application/json');
            options.headers.append('Accept', 'application/json');

            this.http.get(API_URL+'/AutoGroups?access_token='+localStorage.getItem('currentUserToken'), options)
            .subscribe(response => {
                console.log(response.json());       
                this.users = response.json();
				if( this.users.length == 0){
					 this.noautogroup = 0;
				}		
                   
            }, error => {
                console.log(JSON.stringify(error.json()));
            });
        }
    	
 	}
	
	delautoGroup(delId){
		console.log(delId);
		if(confirm("Are you sure?")){
		
			let options = new RequestOptions();
			options.headers = new Headers();
			options.headers.append('Content-Type', 'application/json');
			options.headers.append('Accept', 'application/json');

			this.http.delete(API_URL+'/AutoGroups/'+delId.id+'?access_token='+ localStorage.getItem('currentUserToken'), options)
			.subscribe(response => {
				 localStorage.setItem('noticemessage', 'autogroupdelete');	
				const index: number = this.users.indexOf(delId);
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
