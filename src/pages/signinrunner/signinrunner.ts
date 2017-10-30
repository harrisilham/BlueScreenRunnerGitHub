import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home';

/**
 * Generated class for the SigninrunnerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signinrunner',
  templateUrl: 'signinrunner.html',
})
export class SigninrunnerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninrunnerPage');
  }
  itemTapped(event, item) {
    this.navCtrl.setRoot(HomePage);
  }
}
