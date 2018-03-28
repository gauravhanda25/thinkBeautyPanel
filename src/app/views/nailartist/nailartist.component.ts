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
  templateUrl: 'nailartist.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NailartistComponent {
	
  	private users: any;
    private delparam: any;
    private nousers: any;
    private data: any;
    private use_url: any;

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


        this.http.get(API_URL+'/Members?filter={"where":{"created_by":"'+localStorage.getItem('currentUserId')+'", "status" : "active"}}&access_token='+localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
            console.log(response.json());       
            this.users = response.json();    

            if(this.users.length !=0) {
                for(let i=0; i< this.users.length; i++ ) {
                   /* this.http.get(API_URL+'/Members/'+this.users[i].id+'/roles?access_token='+ localStorage.getItem('currentUserToken'), options)
                    .subscribe(response => {
                        console.log(response.json());       
                        this.users[i].role = response.json()[0].name;  
                    }, error => {
                        console.log(JSON.stringify(error.json()));
                    });  

                    */

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
                    this.toasterService.pop('success', 'Success ', "Nail Artist Record added successfully."); 
                } else if(localStorage.getItem('noticemessage') == "artistupdate") {
                    this.toasterService.pop('success', 'Success ', "Nail Artist Record updated successfully.");
                }  else if(localStorage.getItem('noticemessage') == "artistdelete") {
                    this.toasterService.pop('success', 'Success ', "Nail Artist Record deleted successfully.");
                }

                localStorage.setItem('noticemessage', null);
            }

        }, error => {
            console.log(JSON.stringify(error.json()));
        });    	        

 	}

   
    delartist(nailartist) {
        if(confirm("Are you sure you want to delete the selected Nail Artist?")){
            let options = new RequestOptions();
            options.headers = new Headers();
            options.headers.append('Content-Type', 'application/json');
            options.headers.append('Accept', 'application/json');

            this.http.delete(API_URL+'/Members/'+ nailartist.id +'?access_token='+ localStorage.getItem('currentUserToken'), options)
            .subscribe(response => {
                console.log(response.json()); 
                localStorage.setItem('noticemessage', 'artistdelete');
                this.toasterService.pop('success', 'Success ', "Nail Artist Record deleted successfully.");

                const index: number = this.users.indexOf(nailartist);
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
