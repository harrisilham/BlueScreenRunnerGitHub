import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import firebase from 'firebase';
import { Events } from 'ionic-angular';

import { ViewrunnerUPage } from '../viewrunner-u/viewrunner-u';

/**
 * Generated class for the HomeUPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-u',
  templateUrl: 'home-u.html',
})
export class HomeUPage {
  usernamePassed: any;
  activeMenu: string = 'menu-u'

  dataRef: firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, public events: Events) {
    //get username from last page..front
    this.usernamePassed= navParams.get('username');

    this.activeMenu= 'menu-u' ;
    this.menu.enable(false, 'menu-a');
    this.menu.enable(false, 'menu-r') ;
    this.menu.enable(true, 'menu-u');

    events.publish('user:entered');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeUPage');
  }

  viewrunnerButton(){
    this.navCtrl.push(ViewrunnerUPage);
  }
}
