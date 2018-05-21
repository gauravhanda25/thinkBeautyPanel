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

// Toastr
import { ToasterModule, ToasterService, ToasterConfig, Toast }  from 'angular2-toaster/angular2-toaster';


// Ng2-file-upload
import { FileSelectDirective, FileDropDirective, FileUploadModule, FileUploader } from 'ng2-file-upload';

@Component({
  templateUrl: 'addmain.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss',   '../../../scss/vendors/bs-datepicker/bs-datepicker.scss'],
  encapsulation: ViewEncapsulation.None
})

@Injectable()
export class AddmainComponent {
  
    private data: any;
    private error: number;

    private filesdata: any;
    private containerdata: any;
    public uploader:FileUploader;
    public files:any = [];
    private fileRemove:any = 0;
    private mainImagesCount:any = 0;
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



      this.filesdata = {
        file:''
      }

      this.containerdata = {
        name: ''
      }

      let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json'); 

      this.http.get(API_URL+'/FileStorages?filter={"where":{"and":[{"memberType":"'+this.memberType+'"},{"uploadType":"main"},{"memberId":"'+this.loggedInUserId+'"},{"status":"active"}]}}&access_token='+ localStorage.getItem('currentUserToken'), options)
      .subscribe(storageRes => {
         console.log(this.mainImagesCount = storageRes.json().length);

         this.uploader = new FileUploader({url: API_URL+'/Containers/'+this.loggedInUserId+'/upload?access_token='+localStorage.getItem('currentUserToken'),
          allowedMimeType: ['image/gif','image/jpeg','image/png'] , queueLimit: (4- parseInt(this.mainImagesCount))});   
        

          this.uploader.onAfterAddingFile = function(item) {
            var fileExtension = '.' + item.file.name.split('.').pop();

            item.file.name = item.file.name + new Date().getTime() + fileExtension;
          };

          this.uploader.onSuccessItem = (item:any, response:any, status:any, headers:any) => {
            console.log("ImageUpload:uploaded:", item, status);
            if(status == "200"){
              let fileStorageData = {
                memberId: this.loggedInUserId,
                memberType: (localStorage.getItem('currentUserRoleId') == "2" ? "artist" : "salon"),
                filePath: '/Containers/'+this.loggedInUserId,
                fileName: item.file.name,
                uploadType: 'main' ,       
                status: 'active',  
                created_by: this.loggedInUserId
              }

              this.http.post(API_URL+'/FileStorages?access_token='+ localStorage.getItem('currentUserToken'), fileStorageData ,  options)
              .subscribe(storageRes => {
                console.log(storageRes.json());

                this.router.navigate(['/media/main']);
              }, error => {
                  console.log(JSON.stringify(error.json()));
              });

            } else {
              this.toasterService.pop('error', 'Error ',  "File: "+item.file.name+" not uploaded successfully");
            }
        };
       }, error => {
          console.log(JSON.stringify(error.json()));
       });



     this.http.get(API_URL+'/Containers/'+this.loggedInUserId+'?access_token='+ localStorage.getItem('currentUserToken'),  options)
      .subscribe(response => {     
        console.log(response.json());  
      }, error => {
          console.log(JSON.stringify(error.json()));
            

        this.http.post(API_URL+'/Containers?access_token='+ localStorage.getItem('currentUserToken'), '{"name":"'+this.loggedInUserId+'"}',  options)
        .subscribe(response => {
            console.log(response.json());
        }, error => {
            console.log(JSON.stringify(error.json()));
        });
        
      });

    // this.uploader = new FileUploader({url: API_URL+'/Containers/'+this.loggedInUserId+'/upload?access_token='+localStorage.getItem('currentUserToken'),allowedMimeType: ['image/gif','image/jpeg','image/png'] }); //, queueLimit: 0



    console.log(this.uploader);

}

imagesNoCheck() {
  

}

  
}
