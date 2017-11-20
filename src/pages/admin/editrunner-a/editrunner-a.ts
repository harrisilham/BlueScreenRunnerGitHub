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

  runnerNode: Array<{availability: String, biodata: String, coverArea: String, deliveryCount: number, email: String, fullName: String, ic: number, password: String, licenseNumber: String, phoneNum: number, rating: number, username: String}>=[];

  pathString: any;
  pathRef: any;

  public availability=[];
  public biodata=[];
  public coverArea=[];
  public deliveryCount=[];
  public email=[];
  public fullName=[];
  public ic=[];
  public password=[];
  public licenseNumber=[];
  public phoneNum=[];
  public rating=[];
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

        this.availability[index]=  childSnapshot.child("/availability/").val();
        this.biodata[index]=  childSnapshot.child("/biodata/").val();
        this.coverArea[index]=  childSnapshot.child("/coverArea/").val();
        this.deliveryCount[index]=  childSnapshot.child("/deliveryCount/").val();
        this.email[index]=  childSnapshot.child("/email/").val();
        this.fullName[index]=  childSnapshot.child("/fullName/").val();
        this.ic[index]=  childSnapshot.child("/ic/").val();
        this.password[index]=  childSnapshot.child("/password/").val();
        this.licenseNumber[index]=  childSnapshot.child("/licenseNumber/").val();
        this.phoneNum[index]=  childSnapshot.child("/phoneNum/").val();
        this.rating[index]=  childSnapshot.child("/rating/").val();
        this.username[index]=  childSnapshot.child("/username/").val();

        //push into array object
        if(this.username[index]==this.usernamePassed){//check for selected user to edit
          this.runnerNode.push({
            availability: this.availability[index],
            biodata: this.biodata[index],
            coverArea: this.coverArea[index],
            deliveryCount: this.deliveryCount[index],
            email: this.email[index],
            fullName: this.fullName[index],
            ic: this.ic[index],
            password: this.password[index],
            licenseNumber: this.licenseNumber[index],
            phoneNum: this.phoneNum[index],
            rating: this.rating[index],
            username: this.username[index]
          });
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
