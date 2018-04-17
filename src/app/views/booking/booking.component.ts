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

        const reqUrl = this.router.url;
        if(reqUrl === '/bookings/manage')
        {
             
             this.use_url = API_URL+'/Bookings?access_token='+localStorage.getItem('currentUserToken');
        }
        else {
           
             this.use_url = API_URL+'/Members?filter={"where":{"role_id":4, "status" : "reject"}}&access_token=' + localStorage.getItem('currentUserToken');
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

    getBookingData(userId) {
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        this.http.get(API_URL+'/Members/'+userId+'?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
            console.log(response.json());       
            this.userDetails = response.json();  
        }, error => {
            console.log(JSON.stringify(error.json()));
        }); 
    }

    changeStatus(user, status, action) {
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        let msg:any = "Are you sure you want to "+action+" the selected User?";

        if(confirm(msg)){
            let today:any = new Date();
            let dd:any = today.getDate();
            let mm:any = today.getMonth()+1; //January is 0!
            let yyyy:any = today.getFullYear();

            if(dd<10) {
                dd = '0'+dd
            } 

            if(mm<10) {
                mm = '0'+mm
            } 

            today = mm + '-' + dd + '-' + yyyy;


            user.action_on = today;

            user.status = status;

            this.http.post(API_URL+'/Members/update?where={"id":"'+  user.id +'"}&access_token='+ localStorage.getItem('currentUserToken'), user,  options)
            .subscribe(response => {

                this.toasterService.pop('success', 'Success ', "User Record updated successfully.");
                //this.router.navigate(['user']);  
                const index: number = this.bookings.indexOf(user);

                if (index !== -1) {
                 this.bookings.splice(index, 1);
                }
                   
            }, error => {
                this.toasterService.pop('error', 'Error ',  error.json().error.message);
                console.log(JSON.stringify(error.json()));
            });
        }
    } 

    cancelBooking(user) {
        if(confirm("Are you sure you want to cancel the selected Booking?")){
            let options = new RequestOptions();
            options.headers = new Headers();
            options.headers.append('Content-Type', 'application/json');
            options.headers.append('Accept', 'application/json');

            this.http.delete(API_URL+'/Members/'+ user.id +'?access_token='+ localStorage.getItem('currentUserToken'), options)
            .subscribe(response => {
                console.log(response.json()); 
                this.toasterService.pop('success', 'Success ', "User Record deleted successfully.");
                //this.router.navigate(['user']);

                const index: number = this.bookings.indexOf(user);
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
