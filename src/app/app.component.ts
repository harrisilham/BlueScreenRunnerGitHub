import { Component, ViewChild, Injectable } from '@angular/core';
import { Nav, Platform, NavController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MenuController } from 'ionic-angular';
import firebase from 'firebase';

import { HomeAPage } from '../pages/admin/home-a/home-a';
import { HomeUPage } from '../pages/user/home-u/home-u';
import { HomeRPage } from '../pages/runner/home-r/home-r';
import { FrontPage } from '../pages/front/front';
import { ProfileUPage } from '../pages/user/profile-u/profile-u';
import { ProfileRPage } from '../pages/runner/profile-r/profile-r';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = FrontPage;
  username:any;

  pagesA: Array<{title: string, component: any}>;
  pagesU: Array<{title: string, component: any}>;
  pagesR: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public menuCtrl: MenuController, public events: Events) {
    this.initializeApp();

    //get username passed
    this.events.subscribe('username',(usernamePassed)=>{
      this.username= usernamePassed;
    });

    // admin menu elements
    this.pagesA = [
      { title: 'Home', component: HomeAPage },
      { title: 'Sign Out', component: FrontPage },
    ];

    //user menu elements
    this.pagesU = [
      { title: 'Home', component: HomeUPage },
      { title: 'My Profile', component: ProfileUPage },
      { title: 'Sign Out', component: FrontPage },
    ];

    //runner menu elements
    this.pagesR = [
      { title: 'Home', component: HomeRPage },
      { title: 'My Profile', component: ProfileRPage },
      { title: 'Sign Out', component: FrontPage },
    ];

    firebase.initializeApp({
      apiKey: "AIzaSyB4gM65eE1RYXe3gc7nAMqV1IWZqjODPXw",
      authDomain: "bluescreenrunner.firebaseapp.com",
      databaseURL: "https://bluescreenrunner.firebaseio.com",
      projectId: "bluescreenrunner",
      storageBucket: "bluescreenrunner.appspot.com",
      messagingSenderId: "833160565470"
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if(page.title=="Sign Out")this.nav.setRoot(page.component);
    else if(page.title=="Home")this.nav.setRoot(page.component, {
      username: this.username
    });
    else this.nav.push(page.component, {
      username: this.username
    });
  }

  openMenu() {
   this.menuCtrl.open();
 }

 closeMenu() {
   this.menuCtrl.close();
 }

 toggleMenu() {
   this.menuCtrl.toggle();
 }
}
