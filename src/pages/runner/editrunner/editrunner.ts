import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import { HomeRPage} from '../home-r/home-r';
/**
 * Generated class for the EditrunnerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editrunner',
  templateUrl: 'editrunner.html',
})
export class EditrunnerPage {

  bioR: string;
  coverArea: string;
  tickItem: boolean;
  phoneTick: boolean;
  bioTick: boolean;
  coverTick: boolean;
  username: string;

  pathString: any;

  dataRef: firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private alertCtrl: AlertController) {

        this.username = navParams.get('info');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditrunnerPage');
  }

  confirmButton(){
    this.bioR=(<HTMLInputElement>document.getElementById('biodataR')).value;
    this.coverArea=(<HTMLInputElement>document.getElementById('CoverArea')).value;
  //  this.nameTick=(<HTMLInputElement>document.getElementById('nameTick')).value;
  //  this.phoneTick=(<HTMLInputElement>document.getElementById('phoneTick')).value;
  //  this.bioTick=(<HTMLInputElement>document.getElementById('bioTick')).value;
  //this.coverTick=(<HTMLInputElement>document.getElementById('coverTick')).value;


    this.pathString = `/runnerStorage/`+ this.username+ `/` ;
    this.dataRef= firebase.database().ref(this.pathString);
    this.dataRef.update({
    biodata: this.bioR,
    coverArea: this.coverArea
    })
    this.presentAlertSuccess();
    this.navCtrl.setRoot(HomeRPage);

  }


  nameTicked(){
    this.pathString = `/runnerStorage/`+ this.username+ `/` ;
    this.dataRef= firebase.database().ref(this.pathString);
    this.dataRef.update({
    nameTick: "true"
    })

  }

  phoneTicked(){
    this.pathString = `/runnerStorage/`+ this.username+ `/` ;
    this.dataRef= firebase.database().ref(this.pathString);
    this.dataRef.update({
    phoneTick: "true"
    })

  }

  bioTicked(){
    this.pathString = `/runnerStorage/`+ this.username+ `/` ;
    this.dataRef= firebase.database().ref(this.pathString);
    this.dataRef.update({
    bioTick: "true"
    })

  }

  coverTicked(){
    this.pathString = `/runnerStorage/`+ this.username+ `/` ;
    this.dataRef= firebase.database().ref(this.pathString);
    this.dataRef.update({
    coverTick: "true"
    })

  }

  emailTicked(){
    this.pathString = `/runnerStorage/`+ this.username+ `/` ;
    this.dataRef= firebase.database().ref(this.pathString);
    this.dataRef.update({
    emailTick: "true"
    })

  }


  presentAlertSuccess() {
  let alert = this.alertCtrl.create({
    title: 'Successfull !',
    subTitle: 'Data will be saved in the database',
    buttons: ['Dismiss']
  });
  alert.present();
  }
}
