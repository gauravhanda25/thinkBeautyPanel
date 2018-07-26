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
    private userRole:any;

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
            this.userRole = 'artist';
            if(reqUrl === '/bookings/upcoming')  {
                 
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingDate":{"gte":"'+new Date()+'"}},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"created DESC"}&access_token='+localStorage.getItem('currentUserToken');
            } else if(reqUrl === '/bookings/previous') {
                 
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingDate":{"lte":"'+new Date()+'"}},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"created DESC"}&access_token='+localStorage.getItem('currentUserToken');
            } else {
               
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":"cancelled"},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"include":[{"relation":"members","scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"created DESC"}&access_token=' +localStorage.getItem('currentUserToken');
            }
        } else {
            this.userRole = 'admin';

            if(reqUrl === '/bookings/upcoming')  {
                 
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingDate":{"gte":"'+new Date()+'"}}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"created DESC"}&access_token='+localStorage.getItem('currentUserToken');
            } else if(reqUrl === '/bookings/previous') {
                 
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingDate":{"lte":"'+new Date()+'"}}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"created DESC"}&access_token='+localStorage.getItem('currentUserToken');
            } else {
               
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":"cancelled"}]},"include":[{"relation":"members", "scope":{"include":{"relation":"countries"}}},{"relation":"artists", "scope":{"include":{"relation":"countries"}}}],"order":"created DESC"}&access_token=' + localStorage.getItem('currentUserToken');
            }
        }

        this.http.get(this.use_url, options)
        .subscribe(response => {
            console.log(response.json());       
            this.bookings = response.json();    

            if(this.bookings.length !=0) {
                for(let i=0; i< this.bookings.length; i++ ) {
                   this.bookings[i].created = moment(this.bookings[i].created).format('DD MMMM YYYY');
                   this.bookings[i].bookingDate = moment(this.bookings[i].bookingDate).format('DD MMMM YYYY');                   
                }
            } else {
                this.nobookings = 0;
            }
            
            if(localStorage.getItem('noticemessage') != null){
                console.log(localStorage.getItem('noticemessage'));

                if(localStorage.getItem('noticemessage') == "bookingadd") {
                    this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Booking Record added successfully."); 
                } else if(localStorage.getItem('noticemessage') == "bookingupdate") {
                    this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Booking Record updated successfully.");
                }  else if(localStorage.getItem('noticemessage') == "bookingdelete") {
                    this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Booking Record deleted successfully.");
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
            countryInWhere = '"where":{"country":"'+this.countryFilter+'"},';
        } else {
            countryInWhere = '';
        }


        const reqUrl = this.router.url;
        if(localStorage.getItem('currentUserRoleId') != "1") {
            if(reqUrl === '/bookings/upcoming')  {
                 
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingDate":{"gte":"'+new Date()+'"}},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"include":[{"relation":"members", "scope":{'+countryInWhere+'include":{"relation":"countries"}}},{"relation":"artists", "scope":{'+countryInWhere+'"include":{"relation":"countries"}}}],"order":"created DESC"}&access_token='+localStorage.getItem('currentUserToken');

            } else if(reqUrl === '/bookings/previous') {
                 
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingDate":{"lte":"'+new Date()+'"}},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"include":[{"relation":"members", "scope":{'+countryInWhere+'"include":{"relation":"countries"}}},{"relation":"artists", "scope":{'+countryInWhere+'"include":{"relation":"countries"}}}],"order":"created DESC"}&access_token='+localStorage.getItem('currentUserToken');

            } else {
               
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":"cancelled"},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"include":[{"relation":"members","scope":{'+countryInWhere+'"include":{"relation":"countries"}}},{"relation":"artists", "scope":{'+countryInWhere+'"include":{"relation":"countries"}}}],"order":"created DESC"}&access_token=' +localStorage.getItem('currentUserToken');
            }
        } else {

            if(reqUrl === '/bookings/upcoming')  {
                 
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingDate":{"gte":"'+new Date()+'"}}]},"include":[{"relation":"members", "scope":{'+countryInWhere+'"include":{"relation":"countries"}}},{"relation":"artists", "scope":{'+countryInWhere+'"include":{"relation":"countries"}}}],"order":"created DESC"}&access_token='+ localStorage.getItem('currentUserToken');

            } else if(reqUrl === '/bookings/previous') {
                 
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingDate":{"lte":"'+new Date()+'"}}]},"include":[{"relation":"members", "scope":{'+countryInWhere+'"include":{"relation":"countries"}}},{"relation":"artists", "scope":{'+countryInWhere+'"include":{"relation":"countries"}}}],"order":"created DESC"}&access_token='+localStorage.getItem('currentUserToken');

            } else {
               
                 this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":"cancelled"}]},"include":[{"relation":"members", "scope":{'+countryInWhere+'"include":{"relation":"countries"}}},{"relation":"artists", "scope":{'+countryInWhere+'"include":{"relation":"countries"}}}],"order":"created DESC"}&access_token=' + localStorage.getItem('currentUserToken');
            }
        }


        this.bookings = [];
        
        this.http.get(this.use_url, options)
        .subscribe(response => {
            console.log(response.json());       
            this.bookings = response.json();    

            let removeVal:any = 0;
            let filterBookings:any = [];
            if(this.bookings.length !=0) {
                for(let i=0; i< this.bookings.length; i++ ) {
                    if(this.bookings[i-removeVal].members == undefined && this.bookings[i-removeVal].artists == undefined) {
                        // delete this.bookings[i-removeVal];
                        removeVal = removeVal + 1;
                        continue;
                    } else {
                       this.bookings[i].created = moment(this.bookings[i].created).format('DD MMMM YYYY');
                       this.bookings[i].bookingDate = moment(this.bookings[i].bookingDate).format('DD MMMM YYYY');
                       filterBookings.push(this.bookings[i]);
                    }
                }
                this.bookings = filterBookings;
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
            this.bookingDetails.bookingDate = moment(this.bookingDetails.bookingDate).format('DD MMMM YYYY');
            this.bookingDetails.created = moment(this.bookingDetails.created).format('DD MMMM YYYY');

            this.http.get(API_URL+'/Commissions?filter={"where":{"price":"all"}}&access_token='+ localStorage.getItem('currentUserToken'), options)
            .subscribe(commissionRes => { 0;
                 this.bookingDetails.commission = 0;
                 this.bookingDetails.commission = parseInt(commissionRes.json()[0].commission);
             }, error => {
                console.log(JSON.stringify(error.json()));
            }); 

            this.http.get(API_URL+'/Fixedcharges?filter={"where":{"country":"this.bookingDetails.memberId","memberId":"this.bookingDetails.artistId"}}&access_token='+ localStorage.getItem('currentUserToken'), options)
            .subscribe(fixedchargeRes => { 
                this.bookingDetails.fixedcharge = 0 ;
                 this.bookingDetails.fixedcharge = parseInt(fixedchargeRes.json()[0].fixedcharge);
             }, error => {
                console.log(JSON.stringify(error.json()));
            }); 

            if(this.bookingDetails.artists.countries.name == "Bahrain") {
              this.bookingDetails.currency = "BHD";
            } else {
              this.bookingDetails.currency = "KWD";
            }

            this.bookingDetails.artistSubServiceDetails = [];
            this.bookingDetails.totalPrice = [];

            for(let service of this.bookingDetails.artistServiceId){                
                this.http.get(API_URL+'/Artistservices?filter={"where":{"subserviceId":"'+service.subserviceId+'","memberId":"'+this.bookingDetails.artistId+'","servicetype":"'+this.bookingDetails.serviceType+'"}}&access_token='+ localStorage.getItem('currentUserToken'), options)
                .subscribe(servicetypesRes => {
                    console.log(servicetypesRes.json());

                   // this.bookingDetails.totalPrice = parseInt(servicetypesRes.json()[0].price);

                     this.bookingDetails.artistSubServiceDetails.push({
                        name: service.subServiceName,
                        price: parseInt(servicetypesRes.json()[0].price) ,
                        duration: servicetypesRes.json()[0].duration,
                        persons: service.persons,
                     });

                 }, error => {
                    console.log(JSON.stringify(error.json()));
                }); 
            }
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
                this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Booking Record cancelled successfully.");
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
