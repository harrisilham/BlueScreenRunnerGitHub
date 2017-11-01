import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInUPage');
  }

  itemTapped() {

    this.email= (<HTMLInputElement>document.getElementById("emailU")).value;
    this.password= (<HTMLInputElement>document.getElementById('passwordU')).value;

    if(this.email=="admin" && this.password=="admin123"){
      this.navCtrl.setRoot(HomeAPage);
    }

    else if(this.email=="user" && this.password=="user123"){
      this.navCtrl.setRoot(HomeUPage);
    }
    else{
      this.navCtrl.setRoot(SignInUPage);
    }
  }

 buttonRegister(event, item){
     this.navCtrl.setRoot(SignUpUPage);
 }

}
