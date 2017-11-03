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
  username:any;
  password: any;
  pathString: any;
  pathStringA: any;

  usernameRef: firebase.database.Reference;
  passwordRef: firebase.database.Reference;
  usernameARef: firebase.database.Reference;
  passwordARef: firebase.database.Reference;


  public Username= {};
  public Password= {};
  public UsernameA= {};
  public PasswordA= {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInUPage');
  }

  itemTapped() {
    this.username= (<HTMLInputElement>document.getElementById('usernameU')).value;
    this.password= (<HTMLInputElement>document.getElementById('passwordU')).value;
    this.pathString = `/userStorage/`+ this.username+ `/` ;
    this.pathStringA= `/adminStorage/`+ this.username+ `/` ;

    //user data
    this.usernameRef= firebase.database().ref(this.pathString+'username/');
    this.usernameRef.on('value', dataSnapshot => {
      this.Username = dataSnapshot.val();
    })
    this.passwordRef= firebase.database().ref(this.pathString+'password/');
    this.passwordRef.on('value', dataSnapshot => {
      this.Password = dataSnapshot.val();
    })

    //admin data
    this.usernameARef= firebase.database().ref(this.pathStringA+'username/');
    this.usernameARef.on('value', dataSnapshot => {
      this.UsernameA = dataSnapshot.val();
    })
    this.passwordARef = firebase.database().ref(this.pathStringA+'password/');
    this.passwordARef.on('value', dataSnapshot => {
      this.PasswordA = dataSnapshot.val();
    })

    //make loading here
    if(this.Username && this.Password==this.password){
      this.navCtrl.setRoot(HomeUPage);
    }
    else if(this.UsernameA && this.PasswordA==this.password){
      this.navCtrl.setRoot(HomeAPage);
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
