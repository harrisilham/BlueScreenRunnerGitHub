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
  chargeNode: Array<{deliChargeUtm: string, addCharge: string}>=[];

  usernamePassed: any;
  pathStringCharge:any;

  delivery: Array<{accepted: string, additional: string, runnerUsername: string, title: string, userUsername: string}>=[];

  pathRef: any;
  pathString: any;

  delRef: any;
  delString: any;

  key:any;

  public deliChargeUtm={};
  public addCharge={};
  pathRefCharge: firebase.database.Reference;
  pathRefAddCharge:firebase.database.Reference;

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
    this.getData();
  }

    async getData(){
      //get charge data
      this.pathStringCharge= `/chargeStorage/`;

      this.pathRefCharge= firebase.database().ref(this.pathStringCharge+ 'deliChargeUtm/');
      this.pathRefCharge.on('value', snapshot =>  {
        this.deliChargeUtm = snapshot.val();

      });

      this.pathRefAddCharge=firebase.database().ref(this.pathStringCharge+ 'addCharge/');
      this.pathRefAddCharge.on('value', snapshot =>  {
        this.addCharge = snapshot.val();

      });

      this.chargeNode[0]={deliChargeUtm: <string>this.deliChargeUtm, addCharge: <string>this.addCharge}
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
