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
  templateUrl: 'netprofitreport.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss', '../../../scss/vendors/bs-datepicker/bs-datepicker.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NetprofitreportComponent {
	
  	private revenues: any = [];
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
            this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":{"neq":"cancelled"}},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"bookingDate DESC"}&access_token='+localStorage.getItem('currentUserToken');
        } else {
            this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":{"neq":"cancelled"}}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"bookingDate DESC"}&access_token=' + localStorage.getItem('currentUserToken');
        }

        this.http.get(this.use_url, options)
        .subscribe(response => {
            console.log(response.json());       
            this.revenues = response.json();    

            if(this.revenues.length !=0) {
                for(let i=0; i< this.revenues.length; i++ ) {
                   this.revenues[i].created = moment(this.revenues[i].created).format('DD MMMM YYYY');
                   this.revenues[i].bookingDate = moment(this.revenues[i].bookingDate).format('DD MMMM YYYY');

                    this.revenues[i].artistSubServiceDetails = [];
                     this.revenues[i].totalServicePrice = 0;

                    for(let service of this.revenues[i].artistServiceId) {   
                                  
                        this.http.get(API_URL+'/Artistservices?filter={"where":{"subserviceId":"'+service.subserviceId+'","memberId":"'+this.revenues[i].artistId+'","servicetype":"'+this.revenues[i].serviceType+'"}}&access_token='+ localStorage.getItem('currentUserToken'), options)
                        .subscribe(servicetypesRes => {
                        
                            if(servicetypesRes.json().length != 0) {
                                 this.revenues[i].artistSubServiceDetails.push({
                                    name: service.subServiceName,
                                    price: parseInt(servicetypesRes.json()[0].price) ,
                                    duration: servicetypesRes.json()[0].duration,
                                    persons: service.persons,
                                 });
                                  this.total_revenue = parseInt(this.total_revenue) + (this.revenues[i].artistSubServiceDetails[0].price);

                                  this.revenues[i].totalServicePrice += this.revenues[i].artistSubServiceDetails[0].price;
                   
                            }  else {
                                this.revenues[i].artistSubServiceDetails.push({
                                    name: service.subServiceName,
                                    price: parseInt("0") ,
                                    duration: 0,
                                    persons: 0,
                                 });
                                  this.total_revenue = parseInt(this.total_revenue) + (this.revenues[i].artistSubServiceDetails[0].price);

                                  this.revenues[i].totalServicePrice += this.revenues[i].artistSubServiceDetails[0].price;                   
                            }
                            

                                console.log(this.total_revenue);
                         }, error => {
                            console.log(JSON.stringify(error.json()));
                        }); 
                    }

                    
                    

                    this.http.get(API_URL+'/Commissions?filter={"where":{"price":"all"}}&access_token='+ localStorage.getItem('currentUserToken'), options)
                    .subscribe(commissionRes => { 0;
                         this.revenues[i].commission = 0;
                         this.revenues[i].commission = parseInt(commissionRes.json()[0].commission);
                     }, error => {
                        console.log(JSON.stringify(error.json()));
                    }); 


                    if(this.revenues[i].artists.countries.name == "Bahrain") {
                      this.revenues[i].currency = "BHD";
                    } else {
                      this.revenues[i].currency = "KWD";
                    }

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

            if(localStorage.getItem('currentUserRoleId') != "1") {
                this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":{"neq":"cancelled"}},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"bookingDate DESC"}&access_token='+localStorage.getItem('currentUserToken');
            } else {
                this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":{"neq":"cancelled"}}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"bookingDate DESC"}&access_token=' + localStorage.getItem('currentUserToken');
            }
        }

        this.http.get(this.use_url, options)
        .subscribe(response => {
            console.log(response.json());       
            this.revenues = response.json();    

            if(this.revenues.length !=0) {
                for(let i=0; i< this.revenues.length; i++ ) {
                   this.revenues[i].created = moment(this.revenues[i].created).format('DD MMMM YYYY');
                   this.revenues[i].bookingDate = moment(this.revenues[i].bookingDate).format('DD MMMM YYYY');

                    this.revenues[i].artistSubServiceDetails = [];
                     this.revenues[i].totalServicePrice = 0;

                    for(let service of this.revenues[i].artistServiceId) {   
                                  
                        this.http.get(API_URL+'/Artistservices?filter={"where":{"subserviceId":"'+service.subserviceId+'","memberId":"'+this.revenues[i].artistId+'","servicetype":"'+this.revenues[i].serviceType+'"}}&access_token='+ localStorage.getItem('currentUserToken'), options)
                        .subscribe(servicetypesRes => {
                        
                            if(servicetypesRes.json().length != 0) {
                                 this.revenues[i].artistSubServiceDetails.push({
                                    name: service.subServiceName,
                                    price: parseInt(servicetypesRes.json()[0].price) ,
                                    duration: servicetypesRes.json()[0].duration,
                                    persons: service.persons,
                                 });
                                  this.total_revenue = parseInt(this.total_revenue) + (this.revenues[i].artistSubServiceDetails[0].price);

                                  this.revenues[i].totalServicePrice += this.revenues[i].artistSubServiceDetails[0].price;
                   
                            }  else {
                                this.revenues[i].artistSubServiceDetails.push({
                                    name: service.subServiceName,
                                    price: parseInt("0") ,
                                    duration: 0,
                                    persons: 0,
                                 });
                                  this.total_revenue = parseInt(this.total_revenue) + (this.revenues[i].artistSubServiceDetails[0].price);

                                  this.revenues[i].totalServicePrice += this.revenues[i].artistSubServiceDetails[0].price;                   
                            }
                            

                                console.log(this.total_revenue);
                         }, error => {
                            console.log(JSON.stringify(error.json()));
                        }); 
                    }

                    

                    this.http.get(API_URL+'/Commissions?filter={"where":{"price":"all"}}&access_token='+ localStorage.getItem('currentUserToken'), options)
                    .subscribe(commissionRes => { 0;
                         this.revenues[i].commission = 0;
                         this.revenues[i].commission = parseInt(commissionRes.json()[0].commission);
                     }, error => {
                        console.log(JSON.stringify(error.json()));
                    }); 


                    if(this.revenues[i].artists.countries.name == "Bahrain") {
                      this.revenues[i].currency = "BHD";
                    } else {
                      this.revenues[i].currency = "KWD";
                    }

                }
            } else {
                this.norevenues = 0;
            }
            
        }, error => {
            console.log(JSON.stringify(error.json()));
        });         
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

        if(localStorage.getItem('currentUserRoleId') != "1") {
            this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":{"neq":"cancelled"}},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"bookingDate DESC"}&access_token='+localStorage.getItem('currentUserToken');
        } else {
            this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":{"neq":"cancelled"}}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"bookingDate DESC"}&access_token=' + localStorage.getItem('currentUserToken');
        }

        this.http.get(this.use_url, options)
        .subscribe(response => {
            console.log(response.json());       
            this.revenues = response.json();    

            if(this.revenues.length !=0) {
                for(let i=0; i< this.revenues.length; i++ ) {
                   this.revenues[i].created = moment(this.revenues[i].created).format('DD MMMM YYYY');
                   this.revenues[i].bookingDate = moment(this.revenues[i].bookingDate).format('DD MMMM YYYY');

                    this.revenues[i].artistSubServiceDetails = [];
                     this.revenues[i].totalServicePrice = 0;

                    for(let service of this.revenues[i].artistServiceId) {   
                                  
                        this.http.get(API_URL+'/Artistservices?filter={"where":{"subserviceId":"'+service.subserviceId+'","memberId":"'+this.revenues[i].artistId+'","servicetype":"'+this.revenues[i].serviceType+'"}}&access_token='+ localStorage.getItem('currentUserToken'), options)
                        .subscribe(servicetypesRes => {
                        
                            if(servicetypesRes.json().length != 0) {
                                 this.revenues[i].artistSubServiceDetails.push({
                                    name: service.subServiceName,
                                    price: parseInt(servicetypesRes.json()[0].price) ,
                                    duration: servicetypesRes.json()[0].duration,
                                    persons: service.persons,
                                 });
                                  this.total_revenue = parseInt(this.total_revenue) + (this.revenues[i].artistSubServiceDetails[0].price);

                                  this.revenues[i].totalServicePrice += this.revenues[i].artistSubServiceDetails[0].price;
                   
                            }  else {
                                this.revenues[i].artistSubServiceDetails.push({
                                    name: service.subServiceName,
                                    price: parseInt("0") ,
                                    duration: 0,
                                    persons: 0,
                                 });
                                  this.total_revenue = parseInt(this.total_revenue) + (this.revenues[i].artistSubServiceDetails[0].price);

                                  this.revenues[i].totalServicePrice += this.revenues[i].artistSubServiceDetails[0].price;                   
                            }
                            

                                console.log(this.total_revenue);
                         }, error => {
                            console.log(JSON.stringify(error.json()));
                        }); 
                    }                  

                    this.http.get(API_URL+'/Commissions?filter={"where":{"price":"all"}}&access_token='+ localStorage.getItem('currentUserToken'), options)
                    .subscribe(commissionRes => { 0;
                         this.revenues[i].commission = 0;
                         this.revenues[i].commission = parseInt(commissionRes.json()[0].commission);
                     }, error => {
                        console.log(JSON.stringify(error.json()));
                    }); 


                    if(this.revenues[i].artists.countries.name == "Bahrain") {
                      this.revenues[i].currency = "BHD";
                    } else {
                      this.revenues[i].currency = "KWD";
                    }

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
