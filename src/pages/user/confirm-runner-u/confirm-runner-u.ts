import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import firebase from 'firebase';

/**
 * Generated class for the ConfirmRunnerUPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-runner-u',
  templateUrl: 'confirm-runner-u.html',
})
export class ConfirmRunnerUPage {
  usernamePassed: any;

  runnerNode: Array<{email: String, fullName: String, phoneNum: number, username: String, rating: number, deliveryCount: number, biodata: String}>=[];

  pathString: any;
  pathRef: any;

  public email=[];
  public fullName=[];
  public phoneNum=[];
  public username=[];
  public rating=[];
  public deliveryCount=[];
  public biodata=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
    //get username from last page..choose runner u
    this.usernamePassed= navParams.get('username');

    this.pathString= `/runnerStorage/` ;
    this.pathRef= firebase.database().ref(this.pathString);

    //get all data
    this.pathRef.once('value', snapshot => {
      var index=0;
      snapshot.forEach(childSnapshot => {

        this.email[index]=  childSnapshot.child("/email/").val();
        this.fullName[index]=  childSnapshot.child("/fullName/").val();
        this.phoneNum[index]=  childSnapshot.child("/phoneNum/").val();
        this.username[index]=  childSnapshot.child("/username/").val();
        this.rating[index]= childSnapshot.child("/rating/").val();
        this.deliveryCount[index]= childSnapshot.child("/deliveryCount/").val();
        this.biodata[index]= childSnapshot.child("/biodata/").val();

        //push into array object
        if(this.username[index]==this.usernamePassed){
          this.runnerNode.push({email: this.email[index], fullName: this.fullName[index], phoneNum: this.phoneNum[index], username: this.username[index], rating: this.rating[index], deliveryCount: this.deliveryCount[index], biodata: this.biodata[index]  });
        }
        index++;
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmRunnerUPage');
  }

  go(){
    //go next page to create delivery with all other details on next page
  }

}
