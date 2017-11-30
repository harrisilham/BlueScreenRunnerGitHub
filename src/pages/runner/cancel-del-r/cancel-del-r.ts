import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AlertController } from 'ionic-angular';
import { HomeRPage } from '../home-r/home-r';
import firebase from 'firebase';
/**
 * Generated class for the CancelDelRPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cancel-del-r',
  templateUrl: 'cancel-del-r.html',
})
export class CancelDelRPage {

  picdata: any;
  captureDataUrl: any;
  mypicref: any;

  pathString: any;
  pathRef: any;
  dataRef: firebase.database.Reference;

  usernamePassed: any;
  public acceptedDel = [];
  reasonCancel:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private alertCtrl: AlertController) {

    this.usernamePassed= navParams.get('username');
    this.mypicref= firebase.storage().ref('/');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CancelDelRPage');
  }

    capture() {
      const cameraOptions: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      };
      this.camera.getPicture(cameraOptions).then((imageData) => {
        this.captureDataUrl = 'data:image/jpeg;base64,' + imageData;
      }, (err) => {
        // Handle error
      });
    }

  confirmCancel(){

        this.reasonCancel=(<HTMLInputElement>document.getElementById('reasonCancel')).value;

        this.pathString = `/runnerStorage/`+ this.usernamePassed+ `/` ;
        this.dataRef= firebase.database().ref(this.pathString);
        this.dataRef.update({
        reasonCancel: this.reasonCancel,
        acceptedDel: "none"
        })

        this.navCtrl.setRoot(HomeRPage, {
          username: <string>this.usernamePassed
        });


      }
upoad(){
  let storageRef = firebase.storage().ref();
  const filename = Math.floor(Date.now()/1000);

  const imageRef = storageRef.child(`images/${filename}.jpg`);
  imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL).then((snapshot)=> {
  this.presentAlert();
  });
}
    presentAlert() {
          let alert = this.alertCtrl.create({
            title: 'Image Will be saved in Firebase',
            subTitle: 'Thank You!',
            buttons: ['Ok']
          });
          alert.present();
        }
}
