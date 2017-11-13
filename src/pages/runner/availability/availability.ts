import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { HomeRPage} from '../home-r/home-r';

/**
 * Generated class for the AvailabilityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-availability',
  templateUrl: 'availability.html',
})
export class AvailabilityPage {
  isToggled: boolean;

  pathString: any;

  dataRef: firebase.database.Reference;

  constructor(public alertCtrl: AlertController, navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvailabilityPage');
  }

  availableToggled(){
    this.pathString = `/runnerStorage/`+ this.isToggled+ `/` ;
    this.dataRef= firebase.database().ref(this.pathString);
    this.dataRef.update({
    availableToggle: "true"
    })

  }
}