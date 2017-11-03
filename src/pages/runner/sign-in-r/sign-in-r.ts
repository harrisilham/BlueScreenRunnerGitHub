import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

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
  email: any;
  password: any;
  pathString: any;

  public Email= {};
  public Password= {};

  emailRef: firebase.database.Reference;

  front:any = FrontPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInRPage');
  }

  itemTapped() {
    this.email= (<HTMLInputElement>document.getElementById('emailR')).value;
    this.pathString = `/runnerStorage/`+ this.email+ `/` ;

    //runner data
    this.emailRef= firebase.database().ref(this.pathString+'email/');
    this.emailRef.on('value', dataSnapshot => {
      this.Email = dataSnapshot.val();
      })


    const passwordRef: firebase.database.Reference = firebase.database().ref(this.pathString+'password/');
    passwordRef.on('value', dataSnapshot => {
      this.Password = dataSnapshot.val();
    })

    this.password= (<HTMLInputElement>document.getElementById('passwordR')).value;

    if(this.Email){
      if(this.password==this.Password){
        this.navCtrl.setRoot(HomeRPage);
      }
      else{
        this.navCtrl.setRoot(SignInRPage);
      }
    }

    else{
      this.navCtrl.setRoot(SignInRPage);
    }


  }
}
