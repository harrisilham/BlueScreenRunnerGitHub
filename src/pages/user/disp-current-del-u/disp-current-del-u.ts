import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ChooseRunnerUPage } from '../choose-runner-u/choose-runner-u';
import { ChatUPage } from '../chat-u/chat-u';
import { UserMapPage } from '../user-map/user-map';
import { ReceiptUPage } from '../receipt-u/receipt-u';

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
  pathRef: firebase.database.Reference;

  foodthing: any;

  pathStringCharge:any;
  pathRefCharge: firebase.database.Reference;
  pathRefAddCharge:firebase.database.Reference;
  //delivery
  deliveryNode: Array<{accepted: string, additional: string, runnerUsername: string, title: string, userUsername: string}>=[];
  chargeNode: Array<{deliChargeUtm: string, addCharge: string}>=[];

  public accepted={};
  public additional={};
  public runnerUsername={};
  public title={};
  public userUsername={};
  public deliChargeUtm={};
  public addCharge={};
  public done={};
  key: string;

  delString: any;
  delRef: firebase.database.Reference;

  accRef: firebase.database.Reference;
  addRef: firebase.database.Reference;
  rURef: firebase.database.Reference;
  titleRef: firebase.database.Reference;
  uURef: firebase.database.Reference;
  doneRef: firebase.database.Reference;

  haveAcc=0;
  havePen=0;
  haveRej=0;
  haveDone=0;

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
    //get charge data
    this.pathStringCharge= `/chargeStorage/`;

    this.pathRefCharge= firebase.database().ref(this.pathStringCharge+ 'deliChargeUtm/');
    this.pathRefCharge.on('value', snapshot =>  {
      this.deliChargeUtm = snapshot.val();

    });

    this.pathRefAddCharge=firebase.database().ref(this.pathStringCharge+ 'addCharge/');
    this.pathRefAddCharge.on('value', snapshot =>  {
      this.addCharge = snapshot.val();

    });



    await this.delay(1000, Cur); //wait

    //get del data
    this.delString=`/deliveryStorage/`+ <string>this.Cur+ `/`;

    this.accRef= firebase.database().ref(this.delString+ 'accepted');
    this.accRef.on('value', snapshot => {
      this.accepted= snapshot.val();
    });

    this.doneRef= firebase.database().ref(this.delString+ 'done');
    this.doneRef.on('value', snapshot => {
      this.done= snapshot.val();
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

    if(this.accepted=="true" && this.done=="false") {
      this.haveAcc=1;
      this.havePen=0;
      this.haveRej=0;
      this.haveDone=0;
    }
    else if(this.accepted=="false" && this.done=="false") {
      this.haveAcc=0;
      this.havePen=1;
      this.haveRej=0;
      this.haveDone=0;
    }
    else if(this.done=="true" && this.accepted=="false"){
      this.haveAcc=0;
      this.havePen=0;
      this.haveRej=0;
      this.haveDone=1;
    }
    else{
      this.haveAcc=0;
      this.havePen=0;
      this.haveRej=1;
      this.haveDone=0;
    }

    this.chargeNode[0]={deliChargeUtm: <string>this.deliChargeUtm, addCharge: <string>this.addCharge}

    //push to deliveryNode
    this.deliveryNode[0]={accepted: <string>this.accepted, additional: <string>this.additional, runnerUsername: <string>this.runnerUsername, title: <string>this.title, userUsername: <string>this.userUsername}
  }

  delay(ms: number, Cur) {
    //this.test(Cur)
     return new Promise(resolve => setTimeout(resolve, ms) );
  }

  newRunner(){
    this.navCtrl.push(ChooseRunnerUPage, {
      username: <string>this.userUsername ,
      title: <string>this.title,
      additional: <string>this.additional
    });
  }

  goChat(){
    this.navCtrl.push(ChatUPage, {
      userUsername: this.usernamePassed,
      runnerUsername: <string>this.runnerUsername,
      key: <string>this.Cur
    })
  }

  goMap(){
    this.navCtrl.push(UserMapPage, {
      userUsername: this.usernamePassed,
      runnerUsername: <string>this.runnerUsername,
      key: <string>this.Cur
    })
  }

  goReceipt(){
    this.navCtrl.push(ReceiptUPage, {
      userUsername: this.usernamePassed,
      runnerUsername: <string>this.runnerUsername,
      deliChargeUtm: <string>this.deliChargeUtm,
      foodthing: this.foodthing
    })
  }

}
