import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomeUPage } from '../../home-u/home-u';
import firebase from 'firebase';

/**
 * Generated class for the EditUserUPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-user-u',
  templateUrl: 'edit-user-u.html',
})
export class EditUserUPage {

  userNode: Array<{index: number, email: String, fullName: String, password: String, phoneNum: number, username: String}>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {


  }

  editUser(){
    //get from input
    var fullName= (<HTMLInputElement>document.getElementById('fullName')).value;
    var phoneNum= (<HTMLInputElement>document.getElementById('phoneNum')).value;
    var email= (<HTMLInputElement>document.getElementById('email')).value;

    var path=`/userStorage/`+ this.userNode[0].username+`/`;
    var pathRef= firebase.database().ref(path);
    pathRef.update({
      fullName: fullName,
      phoneNum: phoneNum,
      email: email
    });

    this.presentAlert();
    this.navCtrl.setRoot(HomeUPage);
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Changes for <b>'+this.userNode[0].username+ '</b> has been successfully saved!',
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditUserUPage');

    this.userNode.push(this.navParams.get('userNode'));
  }

}
