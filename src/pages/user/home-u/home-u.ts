import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Events } from 'ionic-angular';

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
  activeMenu: string = 'menu-r'

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, public events: Events) {
    this.activeMenu= 'menu-r' ;
    this.menu.enable(true, 'menu-r') ;
    this.menu.enable(false, 'menu-a');

    events.publish('user:entered');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeUPage');
  }

}
