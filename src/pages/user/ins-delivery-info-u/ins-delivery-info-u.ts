import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { HomeUPage } from '../home-u/home-u';

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
    //get username from last page..choose runner u
    this.usernamePassed= navParams.get('username');

    //get selected runner frm prev page..confirm runner
    this.runnerPassed= navParams.get('runner');

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

    //set new key node
    var newKey= this.pathRef.push().key;

    //create delivery
    this.pathString= `/deliveryStorage/`+newKey +`/`;
    this.pathRef= firebase.database().ref(this.pathString);

    this.pathRef.set({
      accepted: "false",
      additional: additional,
      runnerUsername: this.runnerPassed,
      userUsername: this.usernamePassed
    });

    //update at user
    this.pathString= `/userStorage/`+ this.usernamePassed;
    this.pathRef= firebase.database().ref(this.pathString);

    this.pathRef.update({
      currentDelivery: newKey
    });

    //update at runner
    this.pathString= `/runnerStorage/`+ this.runnerPassed;
    this.pathRef= firebase.database().ref(this.pathString);

    this.pathRef.update({
      currentDelivery: newKey
    });

    //go homeU
    this.presentAlert();
    this.navCtrl.setRoot(HomeUPage,{
      username: this.usernamePassed
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
