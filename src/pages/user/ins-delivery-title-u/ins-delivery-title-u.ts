import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChooseRunnerUPage } from '../choose-runner-u/choose-runner-u';

/**
 * Generated class for the InsDeliveryTitleUPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ins-delivery-title-u',
  templateUrl: 'ins-delivery-title-u.html',
})
export class InsDeliveryTitleUPage {
  usernamePassed: any;

  title: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //get username from last page..homeu
    this.usernamePassed= navParams.get('username');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsDeliveryTitleUPage');
  }

  go(){
    this.title= (<HTMLInputElement>document.getElementById('title')).value;
    
    this.navCtrl.push(ChooseRunnerUPage, {
      username: <string>this.usernamePassed,
      title: this.title
    });
  }
}
