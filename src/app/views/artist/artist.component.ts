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
  templateUrl: 'artist.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArtistComponent {
	
  	private users: any;
    private delparam: any;
    private nousers: any;
    private data: any;
    private use_url: any;
    private check_account: any;
    private profession_vals: any;
    private artistDetails:any = [];

    private toasterService: ToasterService;

    public toasterconfig : ToasterConfig =
      new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
      });

    public filterQuery = '';

    constructor(private router:Router, private http: Http, private activatedRoute: ActivatedRoute, toasterService: ToasterService ) { 
        this.profession_vals = ['Make Up', 'Hair', 'Make Up & Hair'];
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

        this.changeAllStatuses();
        const reqUrl = this.router.url;
        if(reqUrl === '/manageartist/newrequests'){
             this.use_url = API_URL+'/Members?filter={"where":{"role_id":2, "status" : "inactive"}}&access_token='+localStorage.getItem('currentUserToken');
             
             this.check_account = {
                id: '',
                action: 'inactive',
                actionName : 'Verify'
            }
        }
        else if(reqUrl === '/manageartist/registered')
        {
              this.check_account = {
                id: '',
                action: 'active',
                actionName : 'Block'
            }
             this.use_url = API_URL+'/Members?filter={"where":{"role_id":2, "status" : "active"}}&access_token='+localStorage.getItem('currentUserToken');
        } 
        else if(reqUrl === '/manageartist/verified')
        {
              this.check_account = {
                id: '',
                action: 'verify',
                actionName : 'Verify'
            }
             this.use_url = API_URL+'/Members?filter={"where":{"role_id":2, "status" : "verify"}}&access_token='+localStorage.getItem('currentUserToken');
        } 
        else {
            this.check_account = {
                id: '',
                action: 'reject',
                actionName : 'Block'
            }
             this.use_url = API_URL+'/Members?filter={"where":{"role_id":2, "status" : "reject"}}&access_token=' + localStorage.getItem('currentUserToken');
        }

        this.http.get(this.use_url, options)
        .subscribe(response => {
            console.log(response.json());       
            this.users = response.json();    

            if(this.users.length !=0) {
                for(let i=0; i< this.users.length; i++ ) {
                 //   this.users[i].created_on = moment(this.users[i].created_on).format('DD/MM/YYYY');
                 //   this.users[i].action_on = moment(this.users[i].action_on).format('DD/MM/YYYY');

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

                }
            } else {
                this.nousers = 0;
            }
            
            if(localStorage.getItem('noticemessage') != null){
                console.log(localStorage.getItem('noticemessage'));

                if(localStorage.getItem('noticemessage') == "artistadd") {
                    this.toasterService.pop('success', 'Success ', "Artist Record added successfully."); 
                } else if(localStorage.getItem('noticemessage') == "artistupdate") {
                    this.toasterService.pop('success', 'Success ', "Artist Record updated successfully.");
                }  else if(localStorage.getItem('noticemessage') == "artistdelete") {
                    this.toasterService.pop('success', 'Success ', "Artist Record deleted successfully.");
                }

                localStorage.setItem('noticemessage', null);
            }

        }, error => {
            console.log(JSON.stringify(error.json()));
        });    	        

 	}

    getArtistData(artistId) {
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        this.http.get(API_URL+'/Members/'+artistId+'?access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
            console.log(response.json());       
            this.artistDetails = response.json();  
        }, error => {
            console.log(JSON.stringify(error.json()));
        }); 
    }

    changeStatus(artist, status, action) {
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        let msg:any = "Are you sure you want to "+action+" the selected Artist?";

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


            artist.action_on = today;

            artist.status = status;
            let where = '{"id": artist.id}';
            console.log(where);

            this.http.post(API_URL+'/Members/update?where={"id":"'+  artist.id +'"}&access_token='+ localStorage.getItem('currentUserToken'), artist,  options)
            .subscribe(response => {

                this.toasterService.pop('success', 'Success ', "Artist Record updated successfully.");
                //this.router.navigate(['artist']);  
                const index: number = this.users.indexOf(artist);

                if (index !== -1) {
                 this.users.splice(index, 1);
                }
                   
            }, error => {
                this.toasterService.pop('error', 'Error ',  error.json().error.message);
                console.log(JSON.stringify(error.json()));
            });
        }
    } 

    changeAllStatuses()  {
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

          

        this.http.post(API_URL+'/Members/update?where={"seen":false}&access_token='+ localStorage.getItem('currentUserToken'), {"seen" : true},  options)
        .subscribe(response => {

            console.log("status changed");
               
        }, error => {
            this.toasterService.pop('error', 'Error ',  error.json().error.message);
            
        });
    }
    delartist(artist) {
        if(confirm("Are you sure you want to delete the selected Artist?")){
            let options = new RequestOptions();
            options.headers = new Headers();
            options.headers.append('Content-Type', 'application/json');
            options.headers.append('Accept', 'application/json');

            this.http.delete(API_URL+'/Members/'+ artist.id +'?access_token='+ localStorage.getItem('currentUserToken'), options)
            .subscribe(response => {
                console.log(response.json()); 
                this.toasterService.pop('success', 'Success ', "Artist Record deleted successfully.");
                //this.router.navigate(['artist']);

                const index: number = this.users.indexOf(artist);
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
