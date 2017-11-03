import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomeAPage } from '../home-a/home-a';
import firebase from 'firebase';

/**
 * Generated class for the AddrunnerAPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addrunner-a',
  templateUrl: 'addrunner-a.html',
})
export class AddrunnerAPage {
  name: string;
  ic: number;
  phone: number;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;

  pathString: any;

  dataRef: firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams,  private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddrunnerAPage');
  }
  registerButton(){
    this.name=(<HTMLInputElement>document.getElementById('nameR')).value;
    this.ic=parseInt((<HTMLInputElement>document.getElementById('ICR')).value);
    this.phone=parseInt((<HTMLInputElement>document.getElementById('phoneR')).value);
    this.email=(<HTMLInputElement>document.getElementById('emailR')).value;
    this.username=(<HTMLInputElement>document.getElementById('usernameR')).value;
    this.password=(<HTMLInputElement>document.getElementById('passwordR')).value;
    this.confirmPassword=(<HTMLInputElement>document.getElementById('confirmpasswordR')).value;

    if(this.name==""||this.ic==null||this.phone==null||this.email==""||this.username==""||this.password==""||this.confirmPassword==""){
      //error cz no input
      this.presentAlert()
      this.navCtrl.setRoot(AddrunnerAPage);
    }
    else if(this.password!=this.confirmPassword){
      //error pass not same
      this.presentAlertpass()
      this.navCtrl.setRoot(AddrunnerAPage);
    }
    else{
      //write data
      this.pathString = `/runnerStorage/`+ this.username+ `/` ;
      this.dataRef= firebase.database().ref(this.pathString);
      this.dataRef.set({
        fullName: this.name,
        ic: this.ic,
        phoneNum: this.phone,
        email: this.email ,
        username: this.username,
        password: this.password
      })
      //make successfull alert uname n pass
      this.navCtrl.setRoot(HomeAPage);
    }

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
