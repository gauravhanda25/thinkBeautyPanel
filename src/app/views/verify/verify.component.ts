import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';
import {Injectable, Inject} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { RouterModule, Routes, Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { API_URL } from '../../globals';

@Component({
  templateUrl: 'verify.component.html'
})

@Injectable()
export class VerifyComponent {
	
  	private data: any;
  	private error: number;
  	private id: string;
  	private success: number;
  	private errorMessage: string;
  	private token: any;

	constructor(@Inject(Http) private http: Http, @Inject(Router)private router:Router, @Inject(ActivatedRoute) private activatedRoute: ActivatedRoute) {
	  	this.data = {
	  	  id:'',
	      token : ''
	    };

	    this.activatedRoute.params.subscribe((params) => {
	        this.id = params.id;
	        this.token = params.token;
	    });

	    this.onSubmit();

	  }


	 onSubmit() {
	 		this.error = 0;
     		this.success = 0;
	 		//this.data.newPassword = btoa(this.data.newPassword);  // encrypt to base64

		  	this.http.get(API_URL+'/Members/confirm' +'?uid='+this.id+'&token='+ this.token)
	        .subscribe(response => {
		        console.log(response.json());
	     		this.error = 0;
	     		this.success = 1;
				this.router.navigate(['artist']);
					
          	}, error => {
          		this.error = 1;
     			this.success = 0;
     			console.log(error.json().error.message);
     			if(error.json().error.code == 'INVALID_TOKEN') {
     				this.errorMessage = 'Your token is expired or invalid!';
     			}
              	
          	});
	}
}
