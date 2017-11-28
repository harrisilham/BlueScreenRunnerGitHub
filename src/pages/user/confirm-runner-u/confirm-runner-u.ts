import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { HomeUPage } from '../home-u/home-u';

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
  runnerPassed: any;
  title: string;
  additional: string;

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public alertCtrl: AlertController) {
    //get username from last page..choose runner u
    this.usernamePassed= navParams.get('username');
    this.runnerPassed= navParams.get('runner');
    this.title= navParams.get('title');
    this.additional= navParams.get('additional');

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
        if(this.username[index]==this.runnerPassed){
          this.runnerNode.push({email: this.email[index], fullName: this.fullName[index], phoneNum: this.phoneNum[index], username: this.username[index], rating: this.rating[index], deliveryCount: this.deliveryCount[index], biodata: this.biodata[index]  });
        }
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmRunnerUPage');
  }

  go(){
    //set new key node
    var newKey= this.pathRef.push().key;


    //create delivery
    this.pathString= `/deliveryStorage/`+newKey +`/`;
    this.pathRef= firebase.database().ref(this.pathString);

    this.pathRef.set({
      accepted: "false",
      additional: this.additional,
      runnerUsername: this.runnerPassed,
      title: this.title,
      userUsername: this.usernamePassed
    });

    //update at user
    this.pathString= `/userStorage/`+ this.usernamePassed;
    this.pathRef= firebase.database().ref(this.pathString);

    this.pathRef.update({
      currentDelivery: newKey
    });

    //update at runner
    this.pathString= `/runnerStorage/`+ this.runnerPassed;
    this.pathRef= firebase.database().ref(this.pathString);

    this.pathRef.update({
      currentDelivery: newKey,
      acceptedDel: "none"
    });

    //go homeU
    this.presentAlert();

    this.navCtrl.setRoot(HomeUPage, {
      username: this.usernamePassed
    });
  }

  presentAlert() {
   let alert = this.alertCtrl.create({
     title: 'New Delivery Requested!!',
     subTitle: 'Please wait for runner confirmation..',
     buttons: ['OK']
  });
   alert.present();
  }

}
