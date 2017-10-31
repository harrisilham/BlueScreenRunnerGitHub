import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {SignInUPage} from '../sign-in-u/sign-in-u'
/**
 * Generated class for the SignUpUPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up-u',
  templateUrl: 'sign-up-u.html',
})
export class SignUpUPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpUPage');
  }

  registerButton(event, item){
    this.navCtrl.push(SignInUPage);
  }
}
