import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInUPage');
  }

  itemTapped() {
    this.email= (<HTMLInputElement>document.getElementById('emailU')).value;
    this.password= (<HTMLInputElement>document.getElementById('passwordU')).value;
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

    if(this.Email){
      if(this.Password==this.password){
        this.navCtrl.setRoot(HomeUPage);
      }
      else{
        this.navCtrl.setRoot(SignInUPage);
      }
    }
    else if(this.EmailA){
      if(this.PasswordA==this.password){
        this.navCtrl.setRoot(HomeAPage);
      }
      else{
        this.navCtrl.setRoot(SignInUPage);
      }
    }
    else{
      this.navCtrl.setRoot(SignInUPage);
    }
  }

 buttonRegister(event, item){
     this.navCtrl.setRoot(SignUpUPage);
 }

}
