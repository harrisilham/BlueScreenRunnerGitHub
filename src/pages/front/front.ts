import { Component , Injectable} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Events } from 'ionic-angular';

import {SignInRPage} from '../runner/sign-in-r/sign-in-r'
import {SignInUPage} from '../user/sign-in-u/sign-in-u'

/**
 * Generated class for the FrontPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
/*  template: ` <ion-tabs>
  <ion-tab [root]="tab1Root"></ion-tab>
  <ion-tab [root]="tab2Root"></ion-tab>
</ion-tabs>` ,*/

  templateUrl: 'front.html'})

export class FrontPage {
  tab1Root = SignInRPage;
  tab2Root = SignInUPage;

  hide : boolean= true ;
  highlight: boolean= true;

  constructor(public events: Events) {
    this.tab1Root = SignInRPage;
    this.tab2Root = SignInUPage;
    this.hide= true;

    events.subscribe('user:entered', ()=> {
      this.hideTab();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FrontPage');
  }

  hideTab(){
    this.hide= false;
  }
}
