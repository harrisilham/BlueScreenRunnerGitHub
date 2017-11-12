import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { ChooseRunnerUPage } from '../choose-runner-u/choose-runner-u';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, public events: Events) {
    //get username from last page..signinu
    this.usernamePassed= navParams.get('username');

    //choose menu to display
    this.activeMenu= 'menu-u' ;
    this.menu.enable(false, 'menu-a');
    this.menu.enable(false, 'menu-r') ;
    this.menu.enable(true, 'menu-u');

    //disable tab from front
    events.publish('user:entered');

    //disp available runner
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeUPage');
  }

  makeDelivery(){
    this.navCtrl.push(ChooseRunnerUPage, {
      username: <string>this.usernamePassed
    });
  }

}
