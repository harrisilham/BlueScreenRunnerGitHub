import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { HomeRPage } from '../home-r/home-r';
import { FrontPage } from '../../front/front'

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in-r.html',
})
export class SignInRPage {
  front:any = FrontPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    //events.publish('user:entered');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInRPage');
  }

  itemTapped(event, item) {
    this.navCtrl.setRoot(HomeRPage);

  }
}
