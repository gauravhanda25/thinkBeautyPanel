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

// Toastr
import { ToasterModule, ToasterService, ToasterConfig }  from 'angular2-toaster/angular2-toaster';

@Component({
  templateUrl: 'profile.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent {
	
  	private users: any;
    private delparam: any;
    private nousers: any;

    private toasterService: ToasterService;

    public toasterconfig : ToasterConfig =
      new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
      });

    public filterQuery = '';

    constructor(private NgxRolesService: NgxRolesService, private NgxPermissionsService: NgxPermissionsService, @Inject(Http) private http: Http, @Inject(Router)private router:Router, private activatedRoute: ActivatedRoute, toasterService: ToasterService ) {

         if(localStorage.getItem('currentUserRoleId') == "1"){
        localStorage.setItem('currentUserRole', "ADMIN");
      } else if(localStorage.getItem('currentUserRoleId') == "2"){
        localStorage.setItem('currentUserRole', "TRAINER");
      } else if(localStorage.getItem('currentUserRoleId') == "3"){
        localStorage.setItem('currentUserRole', "REGIONAL");
      } else if(localStorage.getItem('currentUserRoleId') == "4"){
        localStorage.setItem('currentUserRole', "ACCOUNT");
      } else if(localStorage.getItem('currentUserRoleId') == "5"){
        localStorage.setItem('currentUserRole', "DEALER");
      } else if(localStorage.getItem('currentUserRoleId') == "6"){
        localStorage.setItem('currentUserRole', "SUPPLIER");
      } else if(localStorage.getItem('currentUserRoleId') == "7"){
        localStorage.setItem('currentUserRole', "BDR");
      } else if(localStorage.getItem('currentUserRoleId') == "8"){
        localStorage.setItem('currentUserRole', "PRODCORD");
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

        this.toasterService = toasterService;

        this.nousers = 1;
        
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

        this.http.get(API_URL+'/Members?filter=%7B%22where%22%3A%7B%22or%22%3A%5B%7B%22role_id%22%3A1%7D%2C%7B%22role_id%22%3A2%7D%2C%7B%22role_id%22%3A3%7D%2C%7B%22role_id%22%3A4%7D%5D%7D%7D&access_token='+localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
            console.log(response.json());       
            this.users = response.json();    

            if(this.users.length !=0) {
                for(let i=0; i< this.users.length; i++ ) {
                    this.http.get(API_URL+'/Members/'+this.users[i].id+'/roles?access_token='+ localStorage.getItem('currentUserToken'), options)
                    .subscribe(response => {
                        console.log(response.json());       
                        this.users[i].role = response.json()[0].name;  
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                    });  

                    this.http.get(API_URL+'/Countries/'+this.users[i].country+'?access_token='+ localStorage.getItem('currentUserToken'), options)
                    .subscribe(response => {
                        console.log(response.json());       
                        this.users[i].countryname = response.json().name;  
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                    });  

                    this.http.get(API_URL+'/Provinces/'+this.users[i].province+'?access_token='+ localStorage.getItem('currentUserToken'), options)
                    .subscribe(response => {
                        console.log(response.json());       
                        this.users[i].provincename = response.json().name;  
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                    });  
                }
            } else {
                this.nousers = 0;
            }
            
            if(localStorage.getItem('noticemessage') != null){
                console.log(localStorage.getItem('noticemessage'));

                if(localStorage.getItem('noticemessage') == "staffadd") {
                    this.toasterService.pop('success', 'Success ', "Staff Record added successfully."); 
                } else if(localStorage.getItem('noticemessage') == "staffupdate") {
                    this.toasterService.pop('success', 'Success ', "Staff Record updated successfully.");
                }  

                localStorage.setItem('noticemessage', null);
            }

        }, error => {
            console.log(JSON.stringify(error.json()));
        });    	        

 	}

    delstaff(staff) {
        if(confirm("Are you sure?")){
            let options = new RequestOptions();
            options.headers = new Headers();
            options.headers.append('Content-Type', 'application/json');
            options.headers.append('Accept', 'application/json');

            this.http.delete(API_URL+'/Members/'+ staff.id +'?access_token='+ localStorage.getItem('currentUserToken'), options)
            .subscribe(response => {
                console.log(response.json()); 
                this.toasterService.pop('success', 'Success ', "Staff Record deleted successfully.");
                //this.router.navigate(['staff']);

                const index: number = this.users.indexOf(staff);
                console.log(index);
                if (index !== -1) {
                 this.users.splice(index, 1);
                }   
                if( this.users.length == 0){
                  this.nousers = 0;
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
