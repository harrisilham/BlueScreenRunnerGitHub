import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

import { EditUserUPage } from './edit-user-u/edit-user-u';

/**
 * Generated class for the ProfileUPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile-u',
  templateUrl: 'profile-u.html',
})
export class ProfileUPage {
  usernamePassed: any;

  userNode: Array<{index: number, email: String, fullName: String, password: String, phoneNum: number, username: String}>=[];

  pathString: any;
  pathRef: any;

  public email=[];
  public fullName=[];
  public password=[];
  public phoneNum=[];
  public username=[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //get username from last page..home
    this.usernamePassed= navParams.get('username');

    this.pathString= `/userStorage/` ;
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

        //push into array object
        if(this.username[index]==<string>this.usernamePassed){//check for selected user to edit
          this.userNode.push({index: (index+1), email: this.email[index], fullName: this.fullName[index], password: this.password[index], phoneNum: this.phoneNum[index], username: this.username[index] });
        }
      });
    });
  }

  go(){
    this.navCtrl.push(EditUserUPage, {
      userNode: this.userNode[0]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileUPage');
  }

}
