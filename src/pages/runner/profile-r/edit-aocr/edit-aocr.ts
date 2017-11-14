import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

import {ProfileRPage } from '../profile-r';
/**
 * Generated class for the EditAocrPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-aocr',
  templateUrl: 'edit-aocr.html',
})
export class EditAocrPage {

  usernamePassed: any;
  coverAreaR: string;

  dataRef: firebase.database.Reference;

  runnerNode: Array<{index: number, email: String, fullName: String, password: String, phoneNum: number, username: String, biodata: String, coverArea: String}>=[];

  pathString: any;
  pathRef: any;

  public email=[];
  public fullName=[];
  public password=[];
  public phoneNum=[];
  public username=[];
  public biodata=[];
  public coverArea=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.usernamePassed= navParams.get('username');

    //set path
    this.pathString= `/runnerStorage/` ;
    this.pathRef= firebase.database().ref(this.pathString);

    //get all data
    this.pathRef.once('value', snapshot => {
      var index=0;
      snapshot.forEach(childSnapshot => {

        this.email[index]=  childSnapshot.child("/email/").val();
        this.fullName[index]=  childSnapshot.child("/fullName/").val();
        this.password[index]=  childSnapshot.child("/password/").val();
        this.phoneNum[index]=  childSnapshot.child("/phoneNum/").val();
        this.username[index]=  <string> childSnapshot.child("/username/").val();
        this.biodata[index]= childSnapshot.child("/biodata/").val();
        this.coverArea[index]= childSnapshot.child("/coverArea/").val();

        //push into array object
        if(this.username[index]==<string>this.usernamePassed){//check for selected runner to edit
          this.runnerNode.push({index: (index+1), email: this.email[index], fullName: this.fullName[index], password: this.password[index], phoneNum: this.phoneNum[index], username: this.username[index], biodata: this.biodata[index], coverArea: this.coverArea[index] });
        }
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAocrPage');
  }

  changeAocButton(){
    this.coverAreaR=(<HTMLInputElement>document.getElementById('CoverArea')).value;

    this.pathString = `/runnerStorage/`+ this.usernamePassed+ `/` ;
    this.dataRef= firebase.database().ref(this.pathString);
    this.dataRef.update({
    coverArea: this.coverAreaR
    })

    this.navCtrl.push(ProfileRPage, {
      username: this.usernamePassed
    });
  }

}
