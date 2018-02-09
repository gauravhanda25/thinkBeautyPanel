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

import {
  startOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  addHours
} from 'date-fns';

import { CalendarEvent, CalendarEventAction } from 'angular-calendar'; // import should be from `angular-calendar` in your app


const colors: any = [
//  red
   {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
//  blue
 {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
//  yellow
  {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
];

@Component({
  templateUrl: 'calendar.component.html',
  styleUrls: ['../../../scss/vendors/angular-calendar/angular-calendar.scss'],
  encapsulation: ViewEncapsulation.None
})

@Injectable()
export class CalendarComponent {
    
  public  events: CalendarEvent[];
  private dealers: any;

  private toasterService: ToasterService;

  public toasterconfig : ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 5000
    });


  constructor(private NgxRolesService: NgxRolesService, private NgxPermissionsService: NgxPermissionsService, @Inject(Http) private http: Http, @Inject(Router)private router:Router, private activatedRoute: ActivatedRoute, toasterService: ToasterService) { 
    if(localStorage.getItem('currentUserRoleId') == "1"){
        localStorage.setItem('currentUserRole', "ADMIN");
      } else if(localStorage.getItem('currentUserRoleId') == "2"){
        localStorage.setItem('currentUserRole', "TRAINER");
      } else if(localStorage.getItem('currentUserRoleId') == "3"){
        localStorage.setItem('currentUserRole', "REGIONAL");
      } else if(localStorage.getItem('currentUserRoleId') == "4"){
        localStorage.setItem('currentUserRole', "ACCOUNT");
      }

      this.toasterService = toasterService;
     
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

      let options = new RequestOptions();
      options.headers = new Headers();
      options.headers.append('Content-Type', 'application/json');
      options.headers.append('Accept', 'application/json'); 

      this.http.get(API_URL+'/Members?filter=%7B%22where%22%3A%7B%22or%22%3A%5B%7B%22role_id%22%3A5%7D%5D%7D%2C%22include%22%3A%22addresses%22%7D&access_token='+localStorage.getItem('currentUserToken'), options)
        .subscribe(response => {
          console.log(response.json()); 
          this.dealers = response.json();
          for(let key in this.dealers){
            console.log(key);

            this.http.get(API_URL+'/Members/'+this.dealers[key].id+'/events?access_token='+localStorage.getItem('currentUserToken'), options)
            .subscribe(response => {
                console.log(response.json()); 
                for(let i=0; i<response.json().length; i++) {
                  this.events.push(
                    {
                      start: new Date(response.json()[i].eventstart),
                      end: new Date(response.json()[i].eventend),
                      title: response.json()[i].eventname +": "+ response.json()[i].description,
                      color: colors[i],
                      actions: '' //this.actions
                    }
                  );
                }

              /*  this.events =   [{
                    start: subDays(startOfDay(new Date()), 1),
                    end: addDays(new Date(), 1),
                    title: 'A 3 day event',
                    color: colors.red,
                    actions: this.actions
                  }, {
                    start: startOfDay(new Date()),
                    title: 'An event with no end date',
                    color: colors.yellow,
                    actions: this.actions
                  }, {
                    start: subDays(endOfMonth(new Date()), 3),
                    end: addDays(endOfMonth(new Date()), 3),
                    title: 'A long event that spans 2 months',
                    color: colors.blue
                  }];
                */



                this.events = [...this.events];

                console.log(this.events);

            }, error => {
                console.log(JSON.stringify(error.json()));
            });
          }
      }, error => {
          console.log(JSON.stringify(error.json()));
      });
 }

  view: string = 'month';

  viewDate: Date = new Date();

  actions: CalendarEventAction[] = [{
    label: '<i class="fa fa-fw fa-pencil"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      console.log('Edit event', event);  
    }
  }, {
    label: '<i class="fa fa-fw fa-times"></i>',
    onClick: ({event}: {event: CalendarEvent}): void => {
      this.events = this.events.filter(iEvent => iEvent !== event);
    }
  }];


  
  

  activeDayIsOpen: boolean = true;

  increment(): void {

    const addFn: any = {
      day: addDays,
      week: addWeeks,
      month: addMonths
    }[this.view];

    this.viewDate = addFn(this.viewDate, 1);

  }

  decrement(): void {

    const subFn: any = {
      day: subDays,
      week: subWeeks,
      month: subMonths
    }[this.view];

    this.viewDate = subFn(this.viewDate, 1);

  }

  today(): void {
    this.viewDate = new Date();
  }

  dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {

    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }
}
