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
  templateUrl: 'booking.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BookingComponent {
	
  	private bookings: any;
    private delparam: any;
    private nobookings: any;
    private data: any;
    private use_url: any;
    private bookingDetails:any = [];
    private countries:any;
    private countryFilter:any = '';

    private toasterService: ToasterService;

    public toasterconfig : ToasterConfig =
      new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
      });

    public filterQuery = '';

    constructor(private router:Router, private http: Http, private activatedRoute: ActivatedRoute, toasterService: ToasterService ) { 
        this.toasterService = toasterService;

        this.nobookings = 1;
        
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
        
        this.http.get(API_URL+'/Countries?filter={"order":"name ASC"}&access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
            console.log(response.json());   
            this.countries = response.json();
        }, error => {
            console.log(JSON.stringify(error.json()));
        });

        const reqUrl = this.router.url;
        if(localStorage.getItem('currentUserRoleId') != "1") {
            if(reqUrl === '/bookings/upcoming')  {
                 
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingDate":{"gte":"'+new Date()+'"}},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"bookingDate DESC"}&access_token='+localStorage.getItem('currentUserToken');
            } else if(reqUrl === '/bookings/previous') {
                 
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingDate":{"lte":"'+new Date()+'"}},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"bookingDate DESC"}&access_token='+localStorage.getItem('currentUserToken');
            } else {
               
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":"cancelled"},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"include":[{"relation":"members","scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"bookingDate DESC"}&access_token=' +localStorage.getItem('currentUserToken');
            }
        } else {

            if(reqUrl === '/bookings/upcoming')  {
                 
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingDate":{"gte":"'+new Date()+'"}}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"bookingDate DESC"}&access_token='+localStorage.getItem('currentUserToken');
            } else if(reqUrl === '/bookings/previous') {
                 
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingDate":{"lte":"'+new Date()+'"}}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"bookingDate DESC"}&access_token='+localStorage.getItem('currentUserToken');
            } else {
               
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":"cancelled"}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"bookingDate DESC"}&access_token=' + localStorage.getItem('currentUserToken');
            }
        }

        this.http.get(this.use_url, options)
        .subscribe(response => {
            console.log(response.json());       
            this.bookings = response.json();    

            if(this.bookings.length !=0) {
                for(let i=0; i< this.bookings.length; i++ ) {
                   this.bookings[i].created = moment(this.bookings[i].created).format('DD/MM/YYYY');
                   this.bookings[i].bookingDate = moment(this.bookings[i].bookingDate).format('DD/MM/YYYY');
                }
            } else {
                this.nobookings = 0;
            }
            
            if(localStorage.getItem('noticemessage') != null){
                console.log(localStorage.getItem('noticemessage'));

                if(localStorage.getItem('noticemessage') == "bookingadd") {
                    this.toasterService.pop('success', 'Success ', "Booking Record added successfully."); 
                } else if(localStorage.getItem('noticemessage') == "bookingupdate") {
                    this.toasterService.pop('success', 'Success ', "Booking Record updated successfully.");
                }  else if(localStorage.getItem('noticemessage') == "bookingdelete") {
                    this.toasterService.pop('success', 'Success ', "Booking Record deleted successfully.");
                }

                localStorage.setItem('noticemessage', null);
            }

        }, error => {
            console.log(JSON.stringify(error.json()));
        });    	        

 	}

    onChangeFilter() {
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        let countryInWhere:any;

        if(this.countryFilter != ''){
          //  countryInWhere = ',{"country":"'+this.countryFilter+'"}';
        } else {
            countryInWhere = '';
        }


        const reqUrl = this.router.url;
        if(localStorage.getItem('currentUserRoleId') != "1") {
            if(reqUrl === '/bookings/upcoming')  {
                 
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingDate":{"gte":"'+new Date()+'"}},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"bookingDate DESC"}&access_token='+localStorage.getItem('currentUserToken');
            } else if(reqUrl === '/bookings/previous') {
                 
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingDate":{"lte":"'+new Date()+'"}},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"bookingDate DESC"}&access_token='+localStorage.getItem('currentUserToken');
            } else {
               
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":"cancelled"},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"include":[{"relation":"members","scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"bookingDate DESC"}&access_token=' +localStorage.getItem('currentUserToken');
            }
        } else {

            if(reqUrl === '/bookings/upcoming')  {
                 
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingDate":{"gte":"'+new Date()+'"}}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"bookingDate DESC"}&access_token='+localStorage.getItem('currentUserToken');
            } else if(reqUrl === '/bookings/previous') {
                 
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingDate":{"lte":"'+new Date()+'"}}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"bookingDate DESC"}&access_token='+localStorage.getItem('currentUserToken');
            } else {
               
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":"cancelled"}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"bookingDate DESC"}&access_token=' + localStorage.getItem('currentUserToken');
            }
        }


        this.bookings = [];
        
        this.http.get(this.use_url, options)
        .subscribe(response => {
            console.log(response.json());       
            this.bookings = response.json();    

            if(this.bookings.length !=0) {
                for(let i=0; i< this.bookings.length; i++ ) {
                   this.bookings[i].created = moment(this.bookings[i].created).format('DD/MM/YYYY');
                   this.bookings[i].bookingDate = moment(this.bookings[i].bookingDate).format('DD/MM/YYYY');
                }
            } else {
                this.nobookings = 0;
            }
           
        }, error => {
            console.log(JSON.stringify(error.json()));
        });             

    }


    getBookingData(bookingId) {
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        this.http.get(API_URL+'/Bookings/'+bookingId+'?filter={"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}]}&access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
            console.log(response.json());       
            this.bookingDetails = response.json();  
            this.bookingDetails.bookingDate = moment(this.bookingDetails.bookingDate).format('DD/MM/YYYY');
        }, error => {
            console.log(JSON.stringify(error.json()));
        }); 
    }

    cancelBooking(booking) {
        if(confirm("Are you sure you want to cancel the selected Booking?")){
            let cancellationPostData:any = {
                bookingId: booking.id,
                userId: booking.userId,
            }


            this.http.get(API_URL+'/Bookings/cancelBooking?access_token='+ localStorage.getItem('currentUserToken'), cancellationPostData)
            .subscribe(response => {
                console.log(response.json()); 
                this.toasterService.pop('success', 'Success ', "Booking Record cancelled successfully.");
                //this.router.navigate(['user']);

                const index: number = this.bookings.indexOf(booking);
                console.log(index);
                if (index !== -1) {
                 this.bookings.splice(index, 1);
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
