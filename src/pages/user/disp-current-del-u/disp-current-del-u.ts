import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import firebase from 'firebase';

/**
 * Generated class for the DispCurrentDelUPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-disp-current-del-u',
  templateUrl: 'disp-current-del-u.html',
})
export class DispCurrentDelUPage {

  usernamePassed: any;

  //user
  userNode: Array<{currentDelivery: string, username: string}>=[];

  public currentDelivery=[];
  public username=[];

  public Cur: string;

  pathString: any;
  pathRef: any;

  //delivery
  deliveryNode: Array<{accepted: string, additional: string, runnerUsername: string, title: string, userUsername: string}>=[];

  public accepted={};
  public additional={};
  public runnerUsername={};
  public title={};
  public userUsername={};
  public key: string;

  delString: any;
  delRef: any;

  haveAcc=0;
  havePen=0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    //get username from last page..homeu
    this.usernamePassed= navParams.get('username');

    //get user data
    this.pathString= `/userStorage/`+this.usernamePassed;

    this.pathRef= firebase.database().ref(this.pathString+ '/currentDelivery/');
    this.pathRef.on('value', snapshot => {
      this.Cur = snapshot.val();

      //get del data
      this.delString=`/deliveryStorage/`+ this.Cur;

      this.delRef= firebase.database().ref(this.delString+ 'accepted');
      this.delRef.on('value', snapshot => {
        this.accepted= snapshot.val();
      });

      this.delRef= firebase.database().ref(this.delString+ 'additional');
      this.delRef.on('value', snapshot => {
        this.additional= snapshot.val();
      });

      this.delRef= firebase.database().ref(this.delString+ 'runnerUsername');
      this.delRef.on('value', snapshot => {
        this.runnerUsername= snapshot.val();
      });

      this.delRef= firebase.database().ref(this.delString+ 'title');
      this.delRef.on('value', snapshot => {
        this.title= snapshot.val();
      });

      this.delRef= firebase.database().ref(this.delString+ 'userUsername');
      this.delRef.on('value', snapshot => {
        this.userUsername= snapshot.val();
      });

      if(this.accepted=="true") {
        this.haveAcc=1;
        this.havePen=0;
      }
      else {
        this.haveAcc=0;
        this.havePen=1;
      }


    })




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DispCurrentDelUPage');
  }

}
