import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { HomeRPage } from '../home-r//home-r'
/**
 * Generated class for the MemoinfoRPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-memoinfo-r',
  templateUrl: 'memoinfo-r.html',
})
export class MemoinfoRPage {

  usernamePassed: any;
  delString: any;
  delRef: any;
  pathString: any;
  pathRef: any;
  data={av: true};

  public accepted=[];
  public additional=[];
  public runnerUsername=[];
  public userUsername=[];
  public key=[];
  public title=[];

  delivery: Array<{accepted: string, additional: string, runnerUsername: string, userUsername: string, title: string}>=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {

    var boolAv= false;
    this.usernamePassed= navParams.get('username');
    this.pathString = `/runnerStorage/`+ this.usernamePassed+ `/` ;
    this.delString= `/deliveryStorage/`;
    this.delRef= firebase.database().ref(this.delString);


    this.delRef.on('value', snapshot => {
    var index=0;
      snapshot.forEach(childSnapshot => {
        this.key[index]= childSnapshot.key;

          //get del data
          this.title[index]=  childSnapshot.child("/title/").val();
          this.accepted[index]=  childSnapshot.child("/accepted/").val();
          this.additional[index]= childSnapshot.child("/additional/").val();
          this.runnerUsername[index]= childSnapshot.child("/runnerUsername/").val();
          this.userUsername[index]= childSnapshot.child("/userUsername/").val();

          //push into array object
          this.delivery[0]=({ accepted: this.accepted[index], additional: this.additional[index], runnerUsername: this.runnerUsername[index], userUsername: this.userUsername[index],title: this.title[index] });

      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemoinfoRPage');
  }

  acceptButton(){
    this.pathRef= firebase.database().ref(this.pathString);
      this.pathRef.update({
      availability: "true"
      })

    this.navCtrl.setRoot(HomeRPage, {
      username: <string>this.usernamePassed
    });
  }

  rejectButton(){
    this.rejectAlert();
    this.navCtrl.setRoot(HomeRPage, {
      username: <string>this.usernamePassed
    });
  }

  rejectAlert() {
    let alert = this.alertCtrl.create({
      title: 'You have rejected the request',
      subTitle: 'Just reminder, please turn off your availability if you dont want to make a delivery ',
      buttons: ['Close']
    });
    alert.present();
  }
}
