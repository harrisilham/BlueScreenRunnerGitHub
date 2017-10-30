import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController) {
    this.activeMenu= 'menu-r' ;
    this.menu.enable(true, 'menu-r') ;
    this.menu.enable(false, 'menu-a')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeRPage');
  }

}
