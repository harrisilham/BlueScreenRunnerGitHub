import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import firebase from 'firebase';

import { ConfirmRunnerUPage } from '../confirm-runner-u/confirm-runner-u'

/**
 * Generated class for the ChooseRunnerUPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose-runner-u',
  templateUrl: 'choose-runner-u.html',
})
export class ChooseRunnerUPage {
  usernamePassed: any;

  runnerNode: Array<{index: number, email: String, fullName: String, ic: number, password: String, phoneNum: number, username: String, availability: String, rating: number, deliveryCount: number}>=[];

  runnerNodeSearch: Array<{index: number, email: String, fullName: String, ic: number, password: String, phoneNum: number, username: String, availability: String, rating: number, deliveryCount: number}>=[];

  pathString: any;
  pathRef: any;

  public email=[];
  public fullName=[];
  public ic=[];
  public password=[];
  public phoneNum=[];
  public username=[];
  public availability=[];
  public rating=[];
  public deliveryCount=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    //get username from last page..homeu
    this.usernamePassed= navParams.get('username');

    this.pathString= `/runnerStorage/` ;
    this.pathRef= firebase.database().ref(this.pathString);

    //get all data
    this.pathRef.once('value', snapshot => {
      var index=0;
      snapshot.forEach(childSnapshot => {

        this.email[index]=  childSnapshot.child("/email/").val();
        this.fullName[index]=  childSnapshot.child("/fullName/").val();
        this.ic[index]=  childSnapshot.child("/ic/").val();
        this.password[index]=  childSnapshot.child("/password/").val();
        this.phoneNum[index]=  childSnapshot.child("/phoneNum/").val();
        this.username[index]=  childSnapshot.child("/username/").val();
        this.availability[index]= childSnapshot.child("/availability/").val();
        this.rating[index]= childSnapshot.child("/rating/").val();
        this.deliveryCount[index]= childSnapshot.child("/deliveryCount/").val();

        //push into array object
        if(this.availability[index]=="true"){
          this.runnerNode.push({index: (index+1), email: this.email[index], fullName: this.fullName[index], ic: this.ic[index], password: this.password[index], phoneNum: this.phoneNum[index], username: this.username[index], availability: this.availability[index], rating: this.rating[index], deliveryCount: this.deliveryCount[index]  });
        }
        index++;
      });
    });
    this.initializeRunnerSearch();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseRunnerUPage');
  }

  initializeRunnerSearch(){
    this.runnerNodeSearch=this.runnerNode;
  }

  confirm(usernameR){
    this.navCtrl.push(ConfirmRunnerUPage, {
      username: <string>usernameR //pass runner selected
    });
  }


}
