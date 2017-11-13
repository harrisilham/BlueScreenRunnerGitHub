import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';

import { HomeRPage } from '../home-r/home-r';
import { FrontPage } from '../../front/front'

/**
 * Generated class for the SignInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in-r.html',
})
export class SignInRPage {
  username: any;
  password: any;
  pathString: any;

  public Username= {};
  public Password= {};

  usernameRef: firebase.database.Reference;
  passwordRef: firebase.database.Reference;

  front:any = FrontPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public loadingCtrl: LoadingController, public events: Events) {
    //

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInRPage');
  }


  async itemTapped() {
    this.username= (<HTMLInputElement>document.getElementById('usernameR')).value;
    this.pathString = `/runnerStorage/`+ this.username+ `/` ;
    this.password= (<HTMLInputElement>document.getElementById('passwordR')).value;

    //runner data
    this.usernameRef= firebase.database().ref(this.pathString+'username/');
    this.usernameRef.on('value', dataSnapshot => {
      this.Username = dataSnapshot.val();
      })


    this.passwordRef= firebase.database().ref(this.pathString+'password/');
    this.passwordRef.on('value', dataSnapshot => {
      this.Password = dataSnapshot.val();
    })

    //make loading here
    this.loadingfunc(); //loading spinner
    await this.delay(5000); //wait 5sec

    if(this.username==this.Username && this.password==this.Password){
        this.events.publish("username", this.username);
        this.navCtrl.setRoot(HomeRPage, {
          username: <string> this.Username
        });

    }

    else{
      this.presentAlert();
      this.navCtrl.setRoot(SignInRPage);
    }


  }
  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Wrong Username And Password',
      subTitle: 'Please Try Again',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  delay(ms: number) {
     return new Promise(resolve => setTimeout(resolve, ms));
  }

  loadingfunc() {
    let loading = this.loadingCtrl.create({

      spinner: 'ios',
      dismissOnPageChange: true,
      content: 'Signing in...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 5000);
  }


}
