import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { EventDetailsPage } from '../event-details/event-details';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class EventPage {
  events: Array<{title: string, date: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.events = [];
    for(let i = 1; i < 11; i++) {
      this.events.push({
        title: 'Event ' + i,
        date: '01/05/2018'
      });
    }
  }

  itemTapped(event, e) {
    this.navCtrl.push(EventDetailsPage, {
      event: e
    });
  }
}
