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
  templateUrl: 'updates.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UpdatesComponent {
	
  	private updates: any;
    private delparam: any;
    private noupdates: any;
    private data: any;

    private toasterService: ToasterService;

    public toasterconfig : ToasterConfig =
      new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
      });

    public filterQuery = '';

    constructor(private router:Router, private http: Http, private activatedRoute: ActivatedRoute, toasterService: ToasterService ) { 
      
        this.toasterService = toasterService;

        this.noupdates = 1;
        
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
       

        this.http.get(API_URL+'/Updates?filter={"order":"created_on DESC"}&access_token=' + localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
            console.log(response.json());       

            if(response.json().length !=0) {    
                this.updates = response.json();

                for(let i in this.updates){
                    this.updates[i].created_on = moment(this.updates[i].created_on).format('DD-MM-YYYY');
                }

            } else {
                this.noupdates = 0;
            }
            
            if(localStorage.getItem('noticemessage') != null){
                console.log(localStorage.getItem('noticemessage'));

                if(localStorage.getItem('noticemessage') == "newadd") {
                    this.toasterService.pop('success', 'Success ', "Record added successfully."); 
                } else if(localStorage.getItem('noticemessage') == "newupdate") {
                    this.toasterService.pop('success', 'Success ', "Record updated successfully.");
                }  else if(localStorage.getItem('noticemessage') == "newdelete") {
                    this.toasterService.pop('success', 'Success ', "Record deleted successfully.");
                }

                localStorage.setItem('noticemessage', null);
            }

        }, error => {
            console.log(JSON.stringify(error.json()));
        });    	        

 	}

    
    delupdate(update) {
        if(confirm("Are you sure you want to delete the selected update?")){
            let options = new RequestOptions();
            options.headers = new Headers();
            options.headers.append('Content-Type', 'application/json');
            options.headers.append('Accept', 'application/json');

            this.http.delete(API_URL+'/Updates/'+ update.id +'?access_token='+ localStorage.getItem('currentUserToken'), options)
            .subscribe(response => {
                console.log(response.json()); 
                this.toasterService.pop('success', 'Success ', "Record deleted successfully.");

                const index: number = this.updates.indexOf(update);
                console.log(index);
                if (index !== -1) {
                 this.updates.splice(index, 1);
                }   

            }, error => {
                console.log(JSON.stringify(error.json()));
            });     
        }     
    }


    public toInt(num:string) {
        return +num;
    }

    public sortByWordLength = (a:any) => {
        return a.name.length;
    }

}
