import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FrontPage } from '../../front/front';
import { Events } from 'ionic-angular';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the SignUpUPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up-u',
  templateUrl: 'sign-up-u.html',
})
export class SignUpUPage {
  name: string;
  phone: number;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;

  pathString: any;

  dataRef: firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private alertCtrl: AlertController) {
    events.publish('user:entered');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpUPage');
  }

  register(){
    this.name=(<HTMLInputElement>document.getElementById('nameU')).value;
    this.phone=parseInt((<HTMLInputElement>document.getElementById('phoneU')).value);
    this.email=(<HTMLInputElement>document.getElementById('emailU')).value;
    this.username=(<HTMLInputElement>document.getElementById('usernameU')).value;
    this.password=(<HTMLInputElement>document.getElementById('passwordU')).value;
    this.confirmPassword=(<HTMLInputElement>document.getElementById('confirmPasswordU')).value;

    if(this.name==""||this.phone==null||this.email==""||this.username==""||this.password==""||this.confirmPassword==""){
      //error cz no input
      this.presentAlert()
      this.navCtrl.setRoot(SignUpUPage);
    }
    else if(this.password!=this.confirmPassword){
      //error pass not same
      this.presentAlertpass()
      this.navCtrl.setRoot(SignUpUPage);
    }
    else{
      //write data
      this.pathString = `/userStorage/`+ this.username+ `/` ;
      this.dataRef= firebase.database().ref(this.pathString);
      this.dataRef.set({
        fullName: this.name,
        phoneNum: this.phone,
        email: this.email ,
        username: this.username,
        password: this.password
      })
      //make successfull alert here n ask user to login at frontpage
      this.navCtrl.setRoot(FrontPage);
    }
  }

  out(){
    this.navCtrl.setRoot(FrontPage);
  }

  presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Required Field Cannot Be Left Blank!',
    subTitle: 'Please Fill All The Field',
    buttons: ['Dismiss']
  });
  alert.present();
  }

  presentAlertpass() {
  let alert = this.alertCtrl.create({
    title: 'Passwords Not Matched',
    subTitle: 'Please Try Again',
    buttons: ['Dismiss']
  });
  alert.present();
  }
}
