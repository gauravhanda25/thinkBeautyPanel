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
  templateUrl: 'dealers.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DealersComponent {

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

    constructor(private router:Router, private http: Http, private activatedRoute: ActivatedRoute, toasterService: ToasterService  ) { 

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

        this.http.get(API_URL+'/Members?filter=%7B%22where%22%3A%7B%22or%22%3A%5B%7B%22role_id%22%3A5%7D%5D%7D%2C%22include%22%3A%22addresses%22%7D&access_token='+localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
            console.log(response.json());       
            this.users = response.json(); 
                                
            if(this.users.length != 0) {
                for(let i=0; i< this.users.length; i++ ) {  
                    console.log(this.users[i]["addresses"]);

                    if(this.users[i]["addresses"].length != 0){
                        this.http.get(API_URL+'/Countries/'+this.users[i]["addresses"][0].billcountry+'?access_token='+ localStorage.getItem('currentUserToken'), options)
                        .subscribe(response => {
                            console.log(response.json());       
                            this.users[i].billcountryname = response.json().name;  
                        }, error => {
                            console.log(JSON.stringify(error.json()));
                        }); 

                        this.http.get(API_URL+'/Provinces/'+this.users[i]["addresses"][0].billprovince +'?access_token='+ localStorage.getItem('currentUserToken'), options)
                        .subscribe(response => {
                            console.log(response.json());       
                            this.users[i].billprovincename = response.json().name;  
                        }, error => {
                            console.log(JSON.stringify(error.json()));
                        });   
                    }
                }
            } else {
                this.nousers = 0;
            }


            console.log("FDas");

            if(localStorage.getItem('noticemessage') != null){
                console.log(localStorage.getItem('noticemessage'));

                if(localStorage.getItem('noticemessage') == "dealeradd") {
                    this.toasterService.pop('success', 'Success ', "Dealer Profile added successfully."); 
                } else if(localStorage.getItem('noticemessage') == "dealerupdate") {
                    this.toasterService.pop('success', 'Success ', "Dealer Record updated successfully.");
                }  else if(localStorage.getItem('noticemessage') == "dealerdelete") {
                    this.toasterService.pop('success', 'Success ', "Dealer Record deleted successfully.");
                }

                localStorage.setItem('noticemessage', null);
            }
        }, error => {
            console.log(JSON.stringify(error.json()));
        });
   	
 	}
    
    deldealer(dealer) {
        if(confirm("Are you sure?")){
            let options = new RequestOptions();
            options.headers = new Headers();
            options.headers.append('Content-Type', 'application/json');
            options.headers.append('Accept', 'application/json');

            this.http.delete(API_URL+'/Members/'+ dealer.id +'?access_token='+ localStorage.getItem('currentUserToken'), options)
            .subscribe(response => {
                console.log(response.json()); 

                // delete dealer contacts
                this.http.delete(API_URL+'/Members/'+this.editparam.id+'/contacts?access_token='+localStorage.getItem('currentUserToken'), options)
                .subscribe(response => {
                    console.log(response.json()); 
                }, error => {
                    console.log(JSON.stringify(error.json()));
                });

                // delete dealer events
                this.http.delete(API_URL+'/Members/'+this.editparam.id+'/events?access_token='+localStorage.getItem('currentUserToken'), options)
                .subscribe(response => {
                    console.log(response.json()); 
                }, error => {
                    console.log(JSON.stringify(error.json()));
                });

                // delete dealer adddresses
                this.http.delete(API_URL+'/Members/'+this.editparam.id+'/addresses?access_token='+localStorage.getItem('currentUserToken'), options)
                .subscribe(response => {
                    console.log(response.json());
                }, error => {
                    console.log(JSON.stringify(error.json()));
                });

                 // delete dealer container including files uploaded 
                this.http.delete(API_URL+'/Containers/'+this.editparam.id+'?access_token='+localStorage.getItem('currentUserToken'), options)
                .subscribe(response => {
                    console.log(response.json());
                }, error => {
                    console.log(JSON.stringify(error.json()));
                });


                localStorage.setItem('noticemessage', 'dealerdelete');
                console.log(localStorage.getItem('noticemessage'));
                this.toasterService.pop('success', 'Success ', "Dealer Record deleted successfully.");
                //  this.router.navigate(['dealers']);

                const index: number = this.users.indexOf(dealer);
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
