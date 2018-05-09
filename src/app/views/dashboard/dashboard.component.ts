import { Component, VERSION } from '@angular/core';
import {CommonModule} from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgxPermissionsService, NgxRolesService, NgxPermissionsDirective } from 'ngx-permissions';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { API_URL } from '../../globals';

import * as $ from 'jquery';
import * as moment from 'moment';

@Component({
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent {

  private users: any;
  private use_url: any;
  private artists_requests : Number;
  private salon_requests : Number;
  private salon_registered : Number;
  private artists_registered : Number;
  private artist_services: Number;
  private where_condition : any;
  private role:any;

  private total_revenue:any = 0;
  private month_revenue:any = 0;
  private total_bookings:any = 0;
  private till_bookings:any = 0;
  private upcoming_bookings:any = 0;

  private date:any = new Date();
  private firstDay:any = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  private lastDay:any = new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0);

  private dateDisplay:any = moment(this.date).format('DD-MMMM');
  private firstDayDisplay:any = moment(this.firstDay).format('DD-MMMM');
  private lastDayDisplay:any = moment(this.lastDay).format('DD-MMMM');

  constructor(private NgxRolesService: NgxRolesService, private NgxPermissionsService: NgxPermissionsService, private router:Router, private http: Http) {
    $('.preloader').show();

    console.log(localStorage.getItem('currentUserRoleId'));
    if(localStorage.getItem('currentUserRoleId') == "1"){
      localStorage.setItem('currentUserRole', "ADMIN");
      this.role = "ADMIN";
    } else if(localStorage.getItem('currentUserRoleId') == "2"){
      localStorage.setItem('currentUserRole', "ARTIST");
      this.role = "ARTIST";
    } else if(localStorage.getItem('currentUserRoleId') == "3"){
      localStorage.setItem('currentUserRole', "SALON");
      this.role = "SALON";
    } 

    this.NgxRolesService.flushRoles();

   if(localStorage.getItem('currentUserRole') != null) { 
      this.NgxRolesService.addRole(localStorage.getItem('currentUserRole'), ['A'] );
     } else {
      this.NgxRolesService.addRole("GUEST", ['A'] );     
     }

    let roles = NgxRolesService.getRoles();
    NgxRolesService.roles$.subscribe((data) => {
        console.log(data);
    })


    this.where_condition = {
       'artistRequests' : '{"where":{"role_id":2, "status" : "inactive" }}', 
       'artistRegistered' : '{"where":{"role_id":2, "status" : "active" }}',
       'salonRequests' : '{"where":{"role_id":3, "status" : "inactive" }}',
       'salonRegistered' : '{"where":{"role_id":3, "status" : "active" }}',
    }

    let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
        
        this.use_url = API_URL+'/Members?filter='+this.where_condition.artistRequests+'&access_token='+localStorage.getItem('currentUserToken');

        this.http.get(this.use_url, options)
        .subscribe(response => {      
            this.artists_requests = response.json().length;
        }, error => {
            console.log(JSON.stringify(error.json()));
        }); 

        this.use_url = API_URL+'/Members?filter='+this.where_condition.artistRegistered+'&access_token='+localStorage.getItem('currentUserToken');
        this.http.get(this.use_url, options)
        .subscribe(response => {    
            this.artists_registered = response.json().length;
        }, error => {
            console.log(JSON.stringify(error.json()));
        });



        this.use_url = API_URL+'/Members?filter='+this.where_condition.salonRequests+'&access_token='+localStorage.getItem('currentUserToken');
         this.http.get(this.use_url, options)
        .subscribe(response => {       
            this.salon_requests = response.json().length;
        }, error => {
            console.log(JSON.stringify(error.json()));
        });



        this.use_url = API_URL+'/Members?filter='+this.where_condition.salonRegistered+'&access_token='+localStorage.getItem('currentUserToken');
         this.http.get(this.use_url, options)
        .subscribe(response => {      
            this.salon_registered = response.json().length;
        }, error => {
            console.log(JSON.stringify(error.json()));
        }); 


        this.use_url = API_URL+'/Artistservices?filter={"where":{"artistId":"'+localStorage.getItem('currentUserId')+'"}}&access_token='+localStorage.getItem('currentUserToken');
         this.http.get(this.use_url, options)
        .subscribe(response => {      
            this.artist_services = response.json().length;
        }, error => {
            console.log(JSON.stringify(error.json()));
        });

        
        this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":"done"},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]}}&access_token='+localStorage.getItem('currentUserToken');
        this.http.get(this.use_url, options)
        .subscribe(response => {
          console.log(response.json());       

          if(response.json().length !=0) {
            for(let i=0; i<response.json().length; i++ ) {
              this.total_revenue = this.total_revenue + parseInt(response.json()[i].servicePrice);
            }
          } else {
            this.total_revenue = 0;
          }
        }, error => {
          console.log(JSON.stringify(error.json()));
        });


        this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":"done"},{"artistId":"'+localStorage.getItem('currentUserId')+'"},{"bookingDate":{"between":["'+this.firstDay+'","'+this.lastDay+'"]}}]}}&access_token='+localStorage.getItem('currentUserToken');
        this.http.get(this.use_url, options)
        .subscribe(response => {
          console.log(response.json());       

          if(response.json().length !=0) {
            for(let i=0; i<response.json().length; i++ ) {
              this.month_revenue = this.month_revenue + parseInt(response.json()[i].servicePrice);
            }
          } else {
            this.month_revenue = 0;
          }
        }, error => {
          console.log(JSON.stringify(error.json()));
        });

        
        this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":"done"},{"bookingDate":{"between":["'+new Date()+'","'+this.lastDay+'"]}},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"include":["members","artists"]}&access_token='+localStorage.getItem('currentUserToken');

        this.http.get(this.use_url, options)
        .subscribe(response => {
            console.log(response.json());  
              this.upcoming_bookings = response.json().length;
          }, error => {
          console.log(JSON.stringify(error.json()));
        });


        
        this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":"done"},{"bookingDate":{"between":["'+this.firstDay+'","'+new Date()+'"]}},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"include":["members","artists"]}&access_token='+localStorage.getItem('currentUserToken');
        
        this.http.get(this.use_url, options)
        .subscribe(response => {
            console.log(response.json());  
              this.till_bookings = response.json().length;
          }, error => {
          console.log(JSON.stringify(error.json()));
        });


        
        this.use_url = API_URL+'/Bookings?filter={"where":{"and":[{"bookingStatus":"done"},{"bookingDate":{"between":["'+this.firstDay+'","'+this.lastDay+'"]}},{"artistId":"'+localStorage.getItem('currentUserId')+'"}]},"include":["members","artists"]}&access_token=' + localStorage.getItem('currentUserToken');       

        this.http.get(this.use_url, options)
        .subscribe(response => {
            console.log(response.json());  
              this.total_bookings = response.json().length;
          }, error => {
          console.log(JSON.stringify(error.json()));
        });

        $('.preloader').hide();
      }
  }


