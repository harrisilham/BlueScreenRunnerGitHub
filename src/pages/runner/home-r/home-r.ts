import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the HomeRPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-r',
  templateUrl: 'home-r.html',
})
export class HomeRPage {
  activeMenu: string = 'menu-r'

  bioR: string;
  coverArea: string;
  username: string;

  pathString: any;

  dataRef: firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, public events: Events, private alertCtrl: AlertController) {
    this.activeMenu= 'menu-r' ;
    this.menu.enable(false, 'menu-a');
    this.menu.enable(true, 'menu-r') ;
    this.menu.enable(false, 'menu-u');

    events.publish('user:entered');

    this.username = navParams.get('info');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeRPage');
  }

  confirmButton(){
    this.bioR=(<HTMLInputElement>document.getElementById('biodataR')).value;
    this.coverArea=(<HTMLInputElement>document.getElementById('CoverArea')).value;
    this.pathString = `/runnerStorage/`+ this.username+ `/` ;
    this.dataRef= firebase.database().ref(this.pathString);
    this.dataRef.update({
    biodata: this.bioR,
    coverArea: this.coverArea
    })
    this.presentAlertSuccess();
    this.navCtrl.setRoot(HomeRPage);
  }

  presentAlertSuccess() {
  let alert = this.alertCtrl.create({
    title: 'Successfull !',
    subTitle: 'Data will be saved in the database',
    buttons: ['Dismiss']
  });
  alert.present();
  }
}
