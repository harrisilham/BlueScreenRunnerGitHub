import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';

import { HomeUPage } from '../home-u/home-u';
import { HomeAPage } from '../../admin/home-a/home-a';
import { SignUpUPage } from '../sign-up-u/sign-up-u';
/**
 * Generated class for the SignInUPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-in-u',
  templateUrl: 'sign-in-u.html',
})
export class SignInUPage {
  email:any;
  password: any;
  pathString: any;
  pathStringA: any;

  public Email= {};
  public Password= {};
  public EmailA= {};
  public PasswordA= {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInUPage');
  }

  itemTapped() {
    this.email= (<HTMLInputElement>document.getElementById('emailU')).value;
    this.pathString = `/userStorage/`+ this.email+ `/` ;
    this.pathStringA= `/adminStorage/`+ this.email+ `/` ;

    //user data
    const emailRef: firebase.database.Reference = firebase.database().ref(this.pathString+'email/');
    emailRef.on('value', dataSnapshot => {
      this.Email = dataSnapshot.val();
    })
    const passwordRef: firebase.database.Reference = firebase.database().ref(this.pathString+'password/');
    passwordRef.on('value', dataSnapshot => {
      this.Password = dataSnapshot.val();
    })

    //admin data
    const emailRefA: firebase.database.Reference = firebase.database().ref(this.pathStringA+'email/');
    emailRefA.on('value', dataSnapshot => {
      this.EmailA = dataSnapshot.val();
    })
    const passwordRefA: firebase.database.Reference = firebase.database().ref(this.pathStringA+'password/');
    passwordRefA.on('value', dataSnapshot => {
      this.PasswordA = dataSnapshot.val();
    })


    this.password= (<HTMLInputElement>document.getElementById('passwordU')).value;

    if(this.Email){
      if(this.Password==this.password){
        this.navCtrl.setRoot(HomeUPage);
      }
      else{
        this.presentAlert();
        this.navCtrl.setRoot(SignInUPage);
      }
    }
    else if(this.EmailA){
      if(this.PasswordA==this.password){
        this.navCtrl.setRoot(HomeAPage);
      }
      else{
        this.presentAlert();
        this.navCtrl.setRoot(SignInUPage);
      }
    }
    else{
      this.presentAlert();
      this.navCtrl.setRoot(SignInUPage);
    }
  }

 buttonRegister(event, item){
     this.navCtrl.setRoot(SignUpUPage);
 }
 presentAlert() {
 let alert = this.alertCtrl.create({
   title: 'Wrong Username And Password',
   subTitle: 'Please Try Again',
   buttons: ['Dismiss']
 });
 alert.present();
 }
}
