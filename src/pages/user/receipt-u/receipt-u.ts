import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import firebase from 'firebase';

/**
 * Generated class for the ReceiptUPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-receipt-u',
  templateUrl: 'receipt-u.html',
})
export class ReceiptUPage 
{
  
  usernamePassed: any;

  //user
  userNode: Array<{currentDelivery: string, username: string}>=[];

  public currentDelivery=[];
  public username=[];

  public Cur={};

  pathString: any;
  pathRef: firebase.database.Reference;

  pathStringCharge:any;
  pathRefCharge: firebase.database.Reference;
  pathRefAddCharge:firebase.database.Reference;

  //delivery
  deliveryNode: Array<{foodthing: number, runnerUsername: string, userUsername: string}>=[];
  chargeNode: Array<{deliChargeUtm: string, addCharge: string}>=[];

  public foodthing={};
  public runnerUsername={};
  public userUsername={};
  public deliChargeUtm={};
  public addCharge={};
  key: string;

  delString: any;
  delRef: firebase.database.Reference;

  rURef: firebase.database.Reference;
  uURef: firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() 
  {
    console.log('ionViewDidLoad ReceiptUPage');
    this.usernamePassed= this.navParams.get('username');
    this.getData();
  }

  async getData()
  {
    //get user data
    this.pathString= `/userStorage/`+this.usernamePassed+ `/`;

    var Cur;
    this.pathRef= firebase.database().ref(this.pathString+ 'currentDelivery/');
    this.pathRef.on('value', snapshot =>  
    {
      this.Cur = snapshot.val();
    });

    //get charge data
    this.pathStringCharge= `/chargeStorage/`;

    this.pathRefCharge= firebase.database().ref(this.pathStringCharge+ 'deliChargeUtm/');
    this.pathRefCharge.on('value', snapshot =>  
    {
      this.deliChargeUtm = snapshot.val();
    });

    this.pathRefAddCharge=firebase.database().ref(this.pathStringCharge+ 'addCharge/');
    this.pathRefAddCharge.on('value', snapshot =>  
    {
      this.addCharge = snapshot.val();
    });

    await this.delay(1000, Cur); //wait

    this.rURef= firebase.database().ref(this.delString+ 'runnerUsername');
    this.rURef.on('value', snapshot => 
    {
      this.runnerUsername= snapshot.val();
    });

    this.uURef= firebase.database().ref(this.delString+ 'userUsername');
    this.uURef.on('value', snapshot => 
    {
      this.userUsername= snapshot.val();
    });

    await this.delay(1000, Cur); //wait

    this.chargeNode[0]={deliChargeUtm: <string>this.deliChargeUtm, addCharge: <string>this.addCharge}

    //push to deliveryNode
    this.deliveryNode[0]={foodthing: <number>this.foodthing, runnerUsername: <string>this.runnerUsername, userUsername: <string>this.userUsername}
  }

  delay(ms: number, Cur) 
  {
    //this.test(Cur)
     return new Promise(resolve => setTimeout(resolve, ms) );
  }
}
