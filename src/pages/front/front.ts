import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {FrontRunnerPage} from './front-runner/front-runner' ;
import {FrontUserPage} from './front-user/front-user' ;

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FrontPage');
  }
}
