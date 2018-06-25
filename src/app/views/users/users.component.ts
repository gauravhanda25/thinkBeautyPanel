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
import * as $ from 'jquery';

// Toastr
import { ToasterModule, ToasterService, ToasterConfig }  from 'angular2-toaster/angular2-toaster';

@Component({
  templateUrl: 'users.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent {
	
  	private users: any;
    private delparam: any;
    private nousers: any;
    private data: any;
    private use_url: any;
    private check_account: any;
    private userDetails:any = [];
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
        // alert(this.router.url);

        this.http.get(API_URL+'/Countries?filter={"order":"name ASC"}&access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
            console.log(response.json());   
            this.countries = response.json();
        }, error => {
            console.log(JSON.stringify(error.json()));
        });



        const reqUrl = this.router.url;
        if(reqUrl === '/manageusers/newrequests'){
             this.use_url = API_URL+'/Members?filter={"where":{"role_id":4, "status" : "inactive"},"include":["countries"]}&access_token='+localStorage.getItem('currentUserToken');
             
             this.check_account = {
                id: '',
                action: 'inactive',
                actionName : 'Verify'
            }
        }
        else if(reqUrl === '/manageusers/registered')
        {
              this.check_account = {
                id: '',
                action: 'active',
                actionName : 'Block'
            }
             this.use_url = API_URL+'/Members?filter={"where":{"role_id":4, "status" : {"neq":"reject"}},"include":["countries"]}&access_token='+localStorage.getItem('currentUserToken');
        }
        else {
            this.check_account = {
                id: '',
                action: 'reject',
                actionName : 'Block'
            }
             this.use_url = API_URL+'/Members?filter={"where":{"role_id":4, "status" : "reject"},"include":["countries"]}&access_token=' + localStorage.getItem('currentUserToken');
        }

        this.http.get(this.use_url, options)
        .subscribe(response => {
            console.log(response.json());       
            this.users = response.json();    

            if(this.users.length !=0) {
                for(let i=0; i< this.users.length; i++ ) {
                    this.users[i].created_on = moment(this.users[i].created).format('DD MMMM YYYY');
                    this.users[i].action_on = moment(this.users[i].action_on).format('DD MMMM YYYY');

                    this.http.get(API_URL+'/Members/'+this.users[i].id+'/roles?access_token='+ localStorage.getItem('currentUserToken'), options)
                    .subscribe(response => {
                        console.log(response.json());       
                        this.users[i].role = response.json()[0].name;  
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                    });  

                   /* this.http.get(API_URL+'/Countries/'+this.users[i].country+'?access_token='+ localStorage.getItem('currentUserToken'), options)
                    .subscribe(response => {
                        console.log(response.json());       
                        this.users[i].countryname = response.json().name;  
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                    });  */

                }
            } else {
                this.nousers = 0;
            }
            
            if(localStorage.getItem('noticemessage') != null){
                console.log(localStorage.getItem('noticemessage'));

                if(localStorage.getItem('noticemessage') == "artistadd") {
                    this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Artist Record added successfully."); 
                } else if(localStorage.getItem('noticemessage') == "artistupdate") {
                    this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Artist Record updated successfully.");
                }  else if(localStorage.getItem('noticemessage') == "artistdelete") {
                    this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Artist Record deleted successfully.");
                }

                localStorage.setItem('noticemessage', null);
            }

        }, error => {
            console.log(JSON.stringify(error.json()));
        });    	        

 	}

    resetFilter() {
        this.professionFilter = '';
        this.countryFilter = '';
        this.filterQuery = '';
        this.onChangeFilter();
    }

     onChangeFilter() {
        $('.preloader').show();
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        let includeCondition:any;
        let countryInWhere:any;

        if(this.countryFilter != ''){
            includeCondition = '"include":[{"relation": "countries","scope":{"where":{"id": "'+this.countryFilter+'"}}}]';
            countryInWhere = ',"country":"'+this.countryFilter+'"';
        } else {
            includeCondition = '"include":["countries"]';
            countryInWhere = '';
        }

        const reqUrl = this.router.url;
        if(reqUrl === '/manageusers/newrequests'){
             this.use_url = API_URL+'/Members?filter={"where":{"role_id":4, "status" : "inactive"'+countryInWhere+'},'+includeCondition+'}&access_token='+localStorage.getItem('currentUserToken');
             
             this.check_account = {
                id: '',
                action: 'inactive',
                actionName : 'Verify'
            }
        }
        else if(reqUrl === '/manageusers/registered')
        {
              this.check_account = {
                id: '',
                action: 'active',
                actionName : 'Block'
            }
             this.use_url = API_URL+'/Members?filter={"where":{"role_id":4,"status" : {"neq":"reject"}'+countryInWhere+'},'+includeCondition+'}&access_token='+localStorage.getItem('currentUserToken');
        }
        else {
            this.check_account = {
                id: '',
                action: 'reject',
                actionName : 'Block'
            }
             this.use_url = API_URL+'/Members?filter={"where":{"role_id":4, "status" : "reject"'+countryInWhere+'},'+includeCondition+'}&access_token=' + localStorage.getItem('currentUserToken');
        }

        this.http.get(this.use_url, options)
        .subscribe(response => {
            console.log(response.json());       
            this.users = response.json();    

            if(this.users.length !=0) {
                for(let i=0; i< this.users.length; i++ ) {
                    this.users[i].created_on = moment(this.users[i].created).format('DD MMMM YYYY');
                    this.users[i].action_on = moment(this.users[i].action_on).format('DD MMMM YYYY');

                    this.http.get(API_URL+'/Members/'+this.users[i].id+'/roles?access_token='+ localStorage.getItem('currentUserToken'), options)
                    .subscribe(response => {
                        console.log(response.json());       
                        this.users[i].role = response.json()[0].name;  
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                    });  

                   /* this.http.get(API_URL+'/Countries/'+this.users[i].country+'?access_token='+ localStorage.getItem('currentUserToken'), options)
                    .subscribe(response => {
                        console.log(response.json());       
                        this.users[i].countryname = response.json().name;  
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                    });  */

                }
                $('.preloader').hide();
            } else {
                this.nousers = 0;
                $('.preloader').hide();
            } 
        }, error => {
            $('.preloader').hide(); 
            console.log(JSON.stringify(error.json()));
        });  
    }

    getUserData(userId) {
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

                this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "User Record updated successfully.");
                //this.router.navigate(['user']);  
                const index: number = this.users.indexOf(user);

                if (index !== -1) {
                 this.users.splice(index, 1);
                }
                   
            }, error => {
                this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  error.json().error.message);
                console.log(JSON.stringify(error.json()));
            });
        }
    } 

    deluser(user) {
        if(confirm("Are you sure you want to delete the selected User?")){
            let options = new RequestOptions();
            options.headers = new Headers();
            options.headers.append('Content-Type', 'application/json');
            options.headers.append('Accept', 'application/json');

            this.http.delete(API_URL+'/Members/'+ user.id +'?access_token='+ localStorage.getItem('currentUserToken'), options)
            .subscribe(response => {
                console.log(response.json()); 
                this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "User Record deleted successfully.");
                //this.router.navigate(['user']);

                const index: number = this.users.indexOf(user);
                console.log(index);
                if (index !== -1) {
                 this.users.splice(index, 1);
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
