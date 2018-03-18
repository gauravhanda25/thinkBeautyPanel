import { Component, ViewEncapsulation } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Injectable, Inject} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { RouterModule, Routes, Router, NavigationEnd, ActivatedRoute, ParamMap } from '@angular/router';
import { API_URL } from '../../globals';
import { NgxPermissionsService, NgxRolesService } from 'ngx-permissions';

// Toastr
import { ToasterModule, ToasterService, ToasterConfig }  from 'angular2-toaster/angular2-toaster';

@Component({
  templateUrl: 'login.component.html',
  styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None
})

@Injectable()
export class LoginComponent {
	
  	private data: any;
  	private error: number;
    private reqform:number;

    private toasterService: ToasterService;

    public toasterconfig : ToasterConfig =
      new ToasterConfig({
        tapToDismiss: true,
        timeout: 1000
      });

      public loginType:any;

	constructor(private NgxRolesService: NgxRolesService, private NgxPermissionsService: NgxPermissionsService, @Inject(Http) private http: Http, @Inject(Router)private router:Router, @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute, toasterService: ToasterService) {
	    this.data  = {
	      username: '',
	      password:'',
        email: ''
	    };

      this.toasterService = toasterService;

	    NgxPermissionsService.loadPermissions(["A"]);

      router.events.subscribe((event: any) => {
        if (event instanceof NavigationEnd ) {
          console.log(event.url);
          if(event.url == "/artist"){
            this.loginType = "artist"
          } else if(event.url == "/admin"){
            this.loginType = "admin"
          } else {

          }
        }
      });
	  }


	  onSubmit() {	  	
	  	//this.data.password = btoa(this.data.password);   // encrypt to base64
	 		// console.log(this.data.password);
	 		// console.log(JSON.stringify(this.data));
		
	     if((this.data.username).match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)){
          this.data.email = this.data.username;
          delete this.data.username;
       } else {
          delete this.data.email;
       }


       if(this.loginType == "admin"){
        this.data.role_id = 1;
       } else {
        this.data.role_id = 2;
       }
      
      console.log(this.data);
      const toast = this.toasterService.pop('success', 'Please wait', "Logging you in...")
	    let options = new RequestOptions();
        options.headers = new Headers();
        options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
		
	    this.http.post(API_URL+'/Members/login?include=user', this.data,  options)
	        .subscribe(response => {
	        	console.log(response.json().id);
    			console.log(response.json().user.role_id);
    			localStorage.setItem('currentUserToken', response.json().id);
    			localStorage.setItem('currentUserRoleId', response.json().user.role_id);
          localStorage.setItem('currentUserId', response.json().user.id);
    			localStorage.setItem('currentUser', response.json());

          if(this.data.role_id == localStorage.getItem('currentUserRoleId')){
      			if(localStorage.getItem('currentUserRoleId') == "1"){
      				localStorage.setItem('currentUserRole', "ADMIN");
      			} else if(response.json().user.role_id == "2"){
      				localStorage.setItem('currentUserRole', "ARTIST");
      			} else if(localStorage.getItem('currentUserRoleId') == "3"){
      				localStorage.setItem('currentUserRole', "SALON");
      			} 
          } else {
            this.toasterService.pop('error', 'Login Error ', "Username or password doesn't match!");
          }

          this.NgxRolesService.flushRoles();

    			this.NgxRolesService.addRole(localStorage.getItem('currentUserRole'), ['A']	);

  				if(response.json().user.role_id) {
              this.router.navigate(['dashboard']);
  				} else {
             	 //this.error = 1;
               this.toasterService.clear(toast.toastId, toast.toastContainerId);
               this.toasterService.pop('error', 'Login Error ', "Username or password doesn't match!");
            		//console.log(this.error);
             	}
			       
          }, error => {
              //this.error = 1;
              this.toasterService.clear(toast.toastId, toast.toastContainerId);
              console.log(JSON.stringify(error.json()));
              if(error.json().isTrusted){
                this.toasterService.pop('error', 'Login Error ', "API not working.");
              } else {
                this.toasterService.pop('error', 'Login Error ', error.json().error.message);
              }             
          });
	  }
}
