import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FrontPage } from '../../front/front';
import { Events } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    events.publish('user:entered');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpUPage');
  }

  registerButton(event, item){
    this.navCtrl.push(FrontPage);
  }

  out(){
    this.navCtrl.setRoot(FrontPage);
  }
}
