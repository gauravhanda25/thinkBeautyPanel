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


// Datepicker
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap';


@Component({
  templateUrl: 'lifetimerevenue.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss', '../../../scss/vendors/bs-datepicker/bs-datepicker.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LifetimerevenueComponent {
	
  	private revenues: any;
    private delparam: any;
    private norevenues: any;
    private data: any;
    private use_url: any;
    private revenueDetails:any = [];
    private countries: any;
    private years:any = [];
    private months:any = [];
    private total_revenue:any = 0;


    public bsStartValue = new Date();

    private toasterService: ToasterService;

    public toasterconfig : ToasterConfig =
      new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
      });

    public filterQuery = '';

    private date:any = new Date();
    private firstDay:any = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    private lastDay:any = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

    private datePickerConfig: Partial<BsDatepickerConfig>;
    
    constructor(private router:Router, private http: Http, private activatedRoute: ActivatedRoute, toasterService: ToasterService ) { 
        this.toasterService = toasterService;

        this.datePickerConfig = Object.assign({},
        {
          showWeekNumbers: false
        });

        this.norevenues = 1;
        
        this.delparam = {
            id: '',
            action: 'add'
        }

        this.data = {
            country: '',
            year: '',
            month:'',
            date: ''
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

        this.http.get(API_URL+'/Countries?filter={"order":"name ASC"}&access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
            console.log(response.json());   
            this.countries = response.json();
        }, error => {
            console.log(JSON.stringify(error.json()));
        });

        for(let i = 1970; i<= (new Date()).getFullYear(); i++){
            this.years.push(i);
        }

        this.months = ['January','Feburary','March','April','May','June','July','August','September','October','November','December'];

        const reqUrl = this.router.url;
        if(localStorage.getItem('currentUserRoleId') != "1") {
            this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":{"neq":cancelled"}},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"bookingDate DESC"}&access_token='+localStorage.getItem('currentUserToken');
        } else {
            this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":{"neq":cancelled"}}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"bookingDate DESC"}&access_token=' + localStorage.getItem('currentUserToken');
        }

        this.http.get(this.use_url, options)
        .subscribe(response => {
            console.log(response.json());       
            this.revenues = response.json();    

            if(this.revenues.length !=0) {
                for(let i=0; i< this.revenues.length; i++ ) {
                   this.revenues[i].created = moment(this.revenues[i].created).format('DD/MM/YYYY');
                   this.revenues[i].bookingDate = moment(this.revenues[i].bookingDate).format('DD/MM/YYYY');

                   this.total_revenue = this.total_revenue + parseInt(this.revenues[i].servicePrice);
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

    onChangeFilter(){
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');


        this.total_revenue = 0;
        this.norevenues = 1;

        if(this.data.date == ''){
           

        } else {
            this.data.country = '';
            this.data.year = '';
            this.data.month = '';
            let date = moment(this.data.date).format('YYYY-MM-DD');
            console.log(date);

            this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":"done"},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"include":["members","artists"]}&access_token='+localStorage.getItem('currentUserToken');
        

            this.http.get(this.use_url, options)
            .subscribe(response => {
                console.log(response.json());       
                this.revenues = response.json();    


                if(this.revenues.length !=0) {
                    for(let i=0; i< this.revenues.length; i++ ) {
                       this.revenues[i].created = moment(this.revenues[i].created).format('DD/MM/YYYY');
                       this.revenues[i].bookingDate = moment(this.revenues[i].bookingDate).format('DD/MM/YYYY');

                       this.total_revenue = this.total_revenue + parseInt(this.revenues[i].servicePrice);

                        this.http.get(API_URL+'/Countries?filter={"where":{"id":"'+ this.revenues[i].members.country+'"}}&access_token=' + localStorage.getItem('currentUserToken'), options)
                        .subscribe(response => {
                            this.revenues[i].countryname = response.json()[0].name;
                        }, error => {
                            console.log(JSON.stringify(error.json()));
                        }); 
                    }
                } else {
                    this.norevenues = 0;
                }
            }, error => {
                console.log(JSON.stringify(error.json()));
            });            
        }            
    }

    resetFilter() {
         this.data = {
            country: '',
            year: '',
            month:'',
            date: ''
        }

        this.total_revenue = 0;
        this.norevenues = 1;

        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":"done"},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"include":["members","artists"]}&access_token='+localStorage.getItem('currentUserToken');
        

        this.http.get(this.use_url, options)
        .subscribe(response => {
            console.log(response.json());       
            this.revenues = response.json();    

            if(this.revenues.length !=0) {
                for(let i=0; i< this.revenues.length; i++ ) {
                   this.revenues[i].created = moment(this.revenues[i].created).format('DD/MM/YYYY');
                   this.revenues[i].bookingDate = moment(this.revenues[i].bookingDate).format('DD/MM/YYYY');

                   this.total_revenue = this.total_revenue + parseInt(this.revenues[i].servicePrice);

                    this.http.get(API_URL+'/Countries?filter={"where":{"id":"'+ this.revenues[i].members.country+'"}}&access_token=' + localStorage.getItem('currentUserToken'), options)
                    .subscribe(response => {
                        this.revenues[i].countryname = response.json()[0].name;
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                    }); 
                }
            } else {
                this.norevenues = 0;
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
