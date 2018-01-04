import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the DummyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dummy',
  templateUrl: 'dummy.html',
})
export class DummyPage {
  email: any;
  password: any;
  pathString: any;

  dataRef: firebase.database.Reference;
  emailRef: firebase.database.Reference;
  passwordRef: firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DummyPage');
  }

  write(){
    this.email= (<HTMLInputElement>document.getElementById('email')).value;
    this.password= (<HTMLInputElement>document.getElementById('password')).value;
    this.pathString = `/runnerStorage/`+ this.email+ `/` ;

    this.dataRef= firebase.database().ref(this.pathString);
    this.dataRef.set({
      username: this.email ,
      password: this.password,
    })

  }
}
