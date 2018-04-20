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
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as moment from 'moment';

// Toastr
import { ToasterModule, ToasterService, ToasterConfig }  from 'angular2-toaster/angular2-toaster';

@Component({
  templateUrl: 'lifetimerevenue.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LifetimerevenueComponent {
	
  	private revenues: any;
    private delparam: any;
    private norevenues: any;
    private data: any;
    private use_url: any;
    private revenueDetails:any = [];

    private toasterService: ToasterService;

    public toasterconfig : ToasterConfig =
      new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
      });

    public filterQuery = '';

    constructor(private router:Router, private http: Http, private activatedRoute: ActivatedRoute, toasterService: ToasterService ) { 
        this.toasterService = toasterService;

        this.norevenues = 1;
        
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
        // alert(this.router.url);

        const reqUrl = this.router.url;
        this.use_url = API_URL+'/Bookings?filter={"where":{"bookingStatus":"done"},"include":["members","artists"]}&access_token='+localStorage.getItem('currentUserToken');
        

        this.http.get(this.use_url, options)
        .subscribe(response => {
            console.log(response.json());       
            this.revenues = response.json();    

            if(this.revenues.length !=0) {
                for(let i=0; i< this.revenues.length; i++ ) {
                   this.revenues[i].created = moment(this.revenues[i].created).format('DD/MM/YYYY');
                   this.revenues[i].bookingDate = moment(this.revenues[i].bookingDate).format('DD/MM/YYYY');

                   /* this.http.get(API_URL+'/Artistservices?filter={"where":{"id":"'+ this.bookings[i].artistServiceId+'"}}&access_token=' + localStorage.getItem('currentUserToken'), options)
                    .subscribe(response => {
                        this.bookings[i].serviceName = response.json()[0].serviceType;
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                    }); 

                    */
                }
            } else {
                this.norevenues = 0;
            }
            
            if(localStorage.getItem('noticemessage') != null){
                console.log(localStorage.getItem('noticemessage'));

                if(localStorage.getItem('noticemessage') == "revenueadd") {
                    this.toasterService.pop('success', 'Success ', "Revenue Record added successfully."); 
                } else if(localStorage.getItem('noticemessage') == "revenueupdate") {
                    this.toasterService.pop('success', 'Success ', "Revenue Record updated successfully.");
                }  else if(localStorage.getItem('noticemessage') == "revenuedelete") {
                    this.toasterService.pop('success', 'Success ', "Revenue Record deleted successfully.");
                }

                localStorage.setItem('noticemessage', null);
            }

        }, error => {
            console.log(JSON.stringify(error.json()));
        });    	        

 	}

    getRevenueData(revenueId) {
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        this.http.get(API_URL+'/Bookings/'+revenueId+'?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
            console.log(response.json());       
            this.revenueDetails = response.json();  
        }, error => {
            console.log(JSON.stringify(error.json()));
        }); 
    }

    public toInt(num:string) {
        return +num;
    }

    public sortByWordLength = (a:any) => {
        return a.name.length;
    }

}
