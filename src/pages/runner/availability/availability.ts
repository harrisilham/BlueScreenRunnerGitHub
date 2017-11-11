import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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
  public isToggled: boolean;

  constructor(public alertCtrl: AlertController, navCtrl: NavController, public navParams: NavParams) {
  this.isToggled = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvailabilityPage');
  }

  notify(){
    this.doAlert();
  }

  doAlert() {
  	let alert = this.alertCtrl.create({
  		title: 'Availability',
  		message: 'You just on your availability',
  		buttons: ['OK']
  	});
  	alert.present()
  
  }
}