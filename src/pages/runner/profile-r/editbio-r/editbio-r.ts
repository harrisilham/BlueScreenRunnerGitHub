import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import { ProfileRPage } from '../profile-r';
/**
 * Generated class for the EditbioRPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editbio-r',
  templateUrl: 'editbio-r.html',
})
export class EditbioRPage {

  bioR: string;
  usernamePassed: any;
  profileRPage: any;

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {

    this.usernamePassed= navParams.get('username');
    this.profileRPage= navParams.get('page');

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
    console.log('ionViewDidLoad EditbioRPage');
  }

  changeBioButton(){
    this.bioR=(<HTMLInputElement>document.getElementById('biodataR')).value;

    this.pathString = `/runnerStorage/`+ this.usernamePassed+ `/` ;
    this.dataRef= firebase.database().ref(this.pathString);
    this.dataRef.update({
    biodata: this.bioR
    })
    
    this.profileRPage.doRefresh();
    this.successAlert();
    //should pop
    this.navCtrl.pop();
  }

  successAlert() {
    let alert = this.alertCtrl.create({
      title: 'Your biodata has been updated!',
      buttons: ['OK']
    });
    alert.present();
  }

}
