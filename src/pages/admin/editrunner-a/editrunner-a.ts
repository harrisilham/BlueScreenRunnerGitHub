import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';

/**
 * Generated class for the EditrunnerAPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editrunner-a',
  templateUrl: 'editrunner-a.html',
})
export class EditrunnerAPage {
  usernamePassed: any;

  runnerNode: Array<{index: number, email: String, fullName: String, ic: number, password: String, phoneNum: number, username: String}>=[];

  pathString: any;
  pathRef: any;

  public email=[];
  public fullName=[];
  public ic=[];
  public password=[];
  public phoneNum=[];
  public username=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    //get username from last page..home
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

        //push into array object
        if(this.username[index]==this.usernamePassed){//check for selected user to edit
          this.runnerNode.push({index: (index+1), email: this.email[index], fullName: this.fullName[index], ic: this.ic[index], password: this.password[index], phoneNum: this.phoneNum[index], username: this.username[index] });
        }
      });
    });
  }

  editRunner(){
    //get from input
    var username= (<HTMLInputElement>document.getElementById('username')).value;
    var fullName= (<HTMLInputElement>document.getElementById('fullName')).value;
    var ic= (<HTMLInputElement>document.getElementById('ic')).value;
    var phoneNum= (<HTMLInputElement>document.getElementById('phoneNum')).value;
    var email= (<HTMLInputElement>document.getElementById('email')).value;

    var path=`/runnerStorage/`+ this.runnerNode[0].username+`/`;
    //document.write(path)
    var pathRef= firebase.database().ref(path);
    pathRef.update({
      username: username,
      fullName: fullName,
      ic: ic,
      phoneNum: phoneNum,
      email: email
    });

    this.presentAlert();
    this.navCtrl.pop();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Changes for <b>'+this.runnerNode[0].username+ '</b> has been successfully saved!',
      buttons: ['OK']
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditrunnerAPage');
  }

}
