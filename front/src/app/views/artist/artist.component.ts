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
  templateUrl: 'artist.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArtistComponent {
	
  	private users: any;
    private delparam: any;
    private nousers: any;
    private data: any;

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

        this.http.get(API_URL+'/Members?filter%3D%7B%22where%22%3A%7B%22or%22%3A%7B%22role_id%22%3A2%7D%7D%7D%26&access_token='+localStorage.getItem('currentUserToken'), options)
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

    changeStatus(artist) {
        let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');

        this.data = {
            status : ''
        }
        if(artist.status == 'active') {
             this.data.status = 'inactive';
        } else {
            this.data.status = 'active';
        }
        let where = '{"id": artist.id}';
        console.log(where);

        this.http.post(API_URL+'/Members/update?where=%7B%22id%22%3A%22'+  artist.id +'%22%7D&access_token='+ localStorage.getItem('currentUserToken'), this.data,  options)
        .subscribe(response => {
            console.log(response.json());    
            localStorage.setItem('noticemessage', 'artistupdate');
            this.router.navigate(['artist']);  
            const index: number = this.users.indexOf(artist);
            console.log(index);
            if (index !== -1) {
             this.users.splice(index, 1);
            }
               
        }, error => {
            this.toasterService.pop('error', 'Error ',  error.json().error.message);
            console.log(JSON.stringify(error.json()));
        });
    } 
    delartist(artist) {
        if(confirm("Are you sure?")){
            let options = new RequestOptions();
            options.headers = new Headers();
            options.headers.append('Content-Type', 'application/json');
            options.headers.append('Accept', 'application/json');

            this.http.delete(API_URL+'/Members/'+ artist.id +'?access_token='+ localStorage.getItem('currentUserToken'), options)
            .subscribe(response => {
                console.log(response.json()); 
                localStorage.setItem('noticemessage', 'artistdelete');
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
