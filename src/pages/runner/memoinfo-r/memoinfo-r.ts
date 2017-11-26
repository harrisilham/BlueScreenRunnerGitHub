import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
/**
 * Generated class for the MemoinfoRPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-memoinfo-r',
  templateUrl: 'memoinfo-r.html',
})
export class MemoinfoRPage {

  delString: any;
  delRef: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.delString= `/deliveryStorage/`;
    this.delRef= firebase.database().ref(this.delString);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemoinfoRPage');
  }

}
