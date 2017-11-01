import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  email: any;
  password: any;

  front:any = FrontPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInRPage');
  }

  itemTapped() {

    this.email= (<HTMLInputElement>document.getElementById("emailR")).value;
    this.password= (<HTMLInputElement>document.getElementById('passwordR')).value;

    if(this.email=="runner" && this.password=="runner123"){
      this.navCtrl.setRoot(HomeRPage);
    }
    else{
      this.navCtrl.setRoot(SignInRPage);
    }


  }
}
