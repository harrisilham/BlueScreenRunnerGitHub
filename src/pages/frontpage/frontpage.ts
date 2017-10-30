import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SignInPage } from '../sign-in/sign-in';
import { SigninrunnerPage } from '../signinrunner/signinrunner';
/**
 * Generated class for the FrontpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-frontpage',
  templateUrl: 'frontpage.html',
})
export class FrontpagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FrontpagePage');
  }
  itemTapped(event, item) {
  //  this.navCtrl.push(HomePage);
    this.navCtrl.setRoot(SigninrunnerPage);
  }
}
