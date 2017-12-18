import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeRPage } from '../home-r/home-r';

import firebase from 'firebase';

/**
 * Generated class for the DispDelInfoRPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-disp-del-info-r',
  templateUrl: 'disp-del-info-r.html',
})
export class DispDelInfoRPage {

  runnerNode: Array<{availability: String, currentDelivery: string}>=[];

  usernamePassed: any;

  delivery: Array<{accepted: string, additional: string, runnerUsername: string, title: string, userUsername: string}>=[];

  pathRef: any;
  pathString: any;

  delRef: any;
  delString: any;

  key:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    //get passed var
    this.usernamePassed= navParams.get('username');
    this.runnerNode[0]= navParams.get('runnerNode');
    this.delivery[0]= navParams.get('delivery');
    this.pathString= navParams.get('pathString');
    this.delString= navParams.get('delString');
    this.key= navParams.get('key');


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DispDelInfoRPage');
  }

  acceptButton(){
    //document.write(this.delString)
    var key;
    this.delRef= firebase.database().ref(this.delString);
    this.delRef.update({
    accepted: "true",
    })

    this.pathRef= firebase.database().ref(this.pathString);
    this.pathRef.update({
      acceptedDel: this.key,
      currentDelivery: "none"
    })

    this.navCtrl.setRoot(HomeRPage, {
      username: <string>this.usernamePassed
    });
  }

  rejectButton(){
    //this.rejectAlert();

    this.delRef= firebase.database().ref(this.delString);
    this.delRef.update({
    accepted: "reject",
    })

    this.pathRef= firebase.database().ref(this.pathString);
    this.pathRef.update({
      currentDelivery: "none"
    })

    this.navCtrl.setRoot(HomeRPage, {
      username: <string>this.usernamePassed
    });
  }

}
