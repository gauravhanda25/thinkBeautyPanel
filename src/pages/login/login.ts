import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { EventPage } from '../list/list';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class Login {
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

   loginSubmit(event) {
    this.navCtrl.push(EventPage);
  }

}
