import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { ChooseRunnerUPage } from '../choose-runner-u/choose-runner-u';

import { UserMapPage } from '../user-map/user-map';

import firebase from 'firebase';

/**
 * Generated class for the InsDeliveryInfoUPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ins-delivery-info-u',
  templateUrl: 'ins-delivery-info-u.html',
})
export class InsDeliveryInfoUPage {
  usernamePassed: any;
  runnerPassed: any;
  title: string;

  runnerNode: Array<{email: String, fullName: String, phoneNum: number, username: String, rating: number, deliveryCount: number, biodata: String}>;

  deliveryNode: Array<{accepted: string, deliveryId: number, runnerUsername: string, userUsername: string}>;

  pathString: any;
  pathRef: any;

  public email=[];
  public fullName=[];
  public phoneNum=[];
  public username=[];
  public rating=[];
  public deliveryCount=[];
  public biodata=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private alertCtrl: AlertController) {
    //get passed from last page..ins-title
    this.usernamePassed= navParams.get('username');
    this.title= navParams.get('title');

    //db initial
    this.pathString= `/deliveryStorage/`;
    this.pathRef= firebase.database().ref(this.pathString);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsDeliveryInfoUPage');
  }

  go(){

    //get frm textarea
    var additional= (<HTMLInputElement>document.getElementById('additionalInfo')).value;

    this.navCtrl.push(ChooseRunnerUPage,{
      username: this.usernamePassed,
      title: this.title,
      additional: additional
    });
  }

  presentAlert() {
   let alert = this.alertCtrl.create({
     title: 'New Delivery Requested!!',
     subTitle: 'Please wait for runner confirmation..',
     buttons: ['OK']
  });
   alert.present();
  }

}
