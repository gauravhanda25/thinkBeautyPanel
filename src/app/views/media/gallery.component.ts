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
import * as moment from 'moment';
import * as $ from 'jquery';
import { ModalDirective } from 'ngx-bootstrap/modal';

// Toastr
import { ToasterModule, ToasterService, ToasterConfig }  from 'angular2-toaster/angular2-toaster';
@Component({
	templateUrl: 'gallery.component.html',
	styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
	encapsulation: ViewEncapsulation.None
})
export class GalleryComponent {
	
	public galleryImages:any;
	public apiUrl:any = API_URL;
  private imageSrc:any ;

private memberType:any;
	public loggedInUserId:any = localStorage.getItem('currentUserId');

    private toasterService: ToasterService;

    public toasterconfig : ToasterConfig =
      new ToasterConfig({
        tapToDismiss: true,
        timeout: 5000
      });


    constructor(private NgxRolesService: NgxRolesService, private NgxPermissionsService: NgxPermissionsService, @Inject(Http) private http: Http, @Inject(Router)private router:Router, private activatedRoute: ActivatedRoute, toasterService: ToasterService) {


      	if(localStorage.getItem('currentUserRoleId') == "1"){
        	localStorage.setItem('currentUserRole', "ADMIN");
          this.memberType = 'admin';
      	} else if(localStorage.getItem('currentUserRoleId') == "2"){
        	localStorage.setItem('currentUserRole', "ARTIST");
          this.memberType = 'artist';
      	} else if(localStorage.getItem('currentUserRoleId') == "3"){
        	localStorage.setItem('currentUserRole', "SALON");
          this.memberType = 'salon';
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

      	let options = new RequestOptions();
      	options.headers = new Headers();
      	options.headers.append('Content-Type', 'application/json');
      	options.headers.append('Accept', 'application/json'); 

       	this.http.get(API_URL+'/FileStorages?filter={"where":{"and":[{"memberType":"'+this.memberType+'"},{"or":[{"uploadType":"gallery"}]},{"memberId":"'+this.loggedInUserId+'"},{"status":"active"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
        .subscribe(storageRes => {
	       console.log(this.galleryImages = storageRes.json());
	     }, error => {
	        console.log(JSON.stringify(error.json()));
	     });

    }

getImage(images) {
  this.imageSrc = API_URL+images.filePath+'/download/'+images.fileName;
}

  downloadAttachment(file){
    console.log(file);
     let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json');


    this.http.get(API_URL+'/Containers/'+file.memberId+'/download/'+file.fileName+ '?access_token='+localStorage.getItem('currentUserToken'), options)
    .subscribe(response => {    
      window.open(API_URL+'/Containers/'+file.memberId+'/download/'+file.fileName);
      this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Gallery downloaded file "+file.fileName+" successfully.");
    }, error => {
          this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  "Gallery downloaded file "+file.fileName+"  failed.");
        console.log(JSON.stringify(error.json()));
    });

  }

  removeAttachment(file){
    console.log(file);
     let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json');

      this.http.delete(API_URL+'/Containers/'+ file.memberId +'/files/'+  file.fileName + '?access_token='+localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
          console.log(response.json());
          this.toasterService.clear();	this.toasterService.pop('success', 'Success ', "Gallery Uploaded file "+file.fileName+" deleted successfully.");

          const index: number = this.galleryImages.indexOf(file);
          console.log(index);
          if (index !== -1) {
           this.galleryImages.splice(index, 1);
          }   

          this.http.post(API_URL+'/FileStorages/update?where={"id":"'+file.id+'"}&access_token='+ localStorage.getItem('currentUserToken'), {"status":"inactive"}, options)
          .subscribe(findres => {


          }, error => {
              console.log(JSON.stringify(error.json()));
          });
      }, error => {
            this.toasterService.clear();	this.toasterService.pop('error', 'Error ',  "Gallery Uploaded file "+file.fileName+" deletion failed.");
          console.log(JSON.stringify(error.json()));
      });
  }
	
}
