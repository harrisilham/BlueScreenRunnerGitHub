import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import { EditrunnerAPage } from '../../admin/editrunner-a/editrunner-a';
import { AvailabilityPage} from '../availability/availability';
import firebase from 'firebase';
import { Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { EditrunnerPage} from '../editrunner/editrunner';
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
  usernamePassed: any;

  pathString: any;

  dataRef: firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, public events: Events, private alertCtrl: AlertController) {
    this.activeMenu= 'menu-r' ;
    this.menu.enable(false, 'menu-a');
    this.menu.enable(true, 'menu-r') ;
    this.menu.enable(false, 'menu-u');

    events.publish('user:entered');


  this.usernamePassed= navParams.get('username');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeRPage');
  }

  profileButton(){
    this.navCtrl.push(EditrunnerPage, {
      username: <string>this.usernamePassed
    });
  }

  availabilitybutton(){
    this.navCtrl.push(AvailabilityPage, {
      username: <string>this.usernamePassed
    });
  }
}
