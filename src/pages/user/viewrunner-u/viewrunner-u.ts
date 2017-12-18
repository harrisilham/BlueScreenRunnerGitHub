import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams Events, } from 'ionic-angular';
import firebase from 'firebase';
import { HomeUPage} from '../home-u/home-u';

/**
 * Generated class for the ViewrunnerUPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewrunner-u',
  templateUrl: 'viewrunner-u.html',
})
export class ViewrunnerUPage {

  dataRef: firebase.database.Reference;

  constructor(public navCtrl: NavController, public events: Events, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewrunnerUPage');
  }

}
