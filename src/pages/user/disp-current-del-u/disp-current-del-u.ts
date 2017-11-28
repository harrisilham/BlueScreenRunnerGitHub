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

  public Cur={};

  pathString: any;
  pathRef: firebase.database.Reference;;

  //delivery
  deliveryNode: Array<{accepted: string, additional: string, runnerUsername: string, title: string, userUsername: string}>=[];

  public accepted={};
  public additional={};
  public runnerUsername={};
  public title={};
  public userUsername={};
  public key: string;

  delString: any;
  delRef: firebase.database.Reference;

  accRef: firebase.database.Reference;
  addRef: firebase.database.Reference;
  rURef: firebase.database.Reference;
  titleRef: firebase.database.Reference;
  uURef: firebase.database.Reference;


  haveAcc=0;
  havePen=0;
  haveRej=0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DispCurrentDelUPage');
    //get username from last page..homeu
    this.usernamePassed= this.navParams.get('username');

    this.getData();
  }

  async getData(){
    //get user data
    this.pathString= `/userStorage/`+this.usernamePassed+ `/`;

    var Cur;
    this.pathRef= firebase.database().ref(this.pathString+ 'currentDelivery/');
    this.pathRef.on('value', snapshot =>  {
      this.Cur = snapshot.val();

    });

    await this.delay(1000, Cur); //wait

    //get del data
    this.delString=`/deliveryStorage/`+ <string>this.Cur+ `/`;

    this.accRef= firebase.database().ref(this.delString+ 'accepted');
    this.accRef.on('value', snapshot => {
      this.accepted= snapshot.val();
    });

    this.addRef= firebase.database().ref(this.delString+ 'additional');
    this.addRef.on('value', snapshot => {
      this.additional= snapshot.val();
    });

    this.rURef= firebase.database().ref(this.delString+ 'runnerUsername');
    this.rURef.on('value', snapshot => {
      this.runnerUsername= snapshot.val();
    });

    this.titleRef= firebase.database().ref(this.delString+ 'title');
    this.titleRef.on('value', snapshot => {
      this.title= snapshot.val();
    });

    this.uURef= firebase.database().ref(this.delString+ 'userUsername');
    this.uURef.on('value', snapshot => {
      this.userUsername= snapshot.val();
    });

    await this.delay(1000, Cur); //wait

    if(this.accepted=="true") {
      this.haveAcc=1;
      this.havePen=0;
      this.haveRej=0;
    }
    else if(this.accepted=="false") {
      this.haveAcc=0;
      this.havePen=1;
      this.haveRej=0;
    }
    else{
      this.haveAcc=0;
      this.havePen=0;
      this.haveRej=1;
    }

    //push to deliveryNode
    this.deliveryNode[0]={accepted: <string>this.accepted, additional: <string>this.additional, runnerUsername: <string>this.runnerUsername, title: <string>this.title, userUsername: <string>this.userUsername}
  }

  delay(ms: number, Cur) {
    //this.test(Cur)
     return new Promise(resolve => setTimeout(resolve, ms) );
  }

  newRunner(){
    
  }

}
