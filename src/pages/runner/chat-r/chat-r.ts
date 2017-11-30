import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';

/**
 * Generated class for the ChatRPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-r',
  templateUrl: 'chat-r.html',
})
export class ChatRPage {
  @ViewChild('content') content: Content;
  buddy: any;
  newmessage;
  allmessages = [];
  photoURL;

  runnerPassed: string;
  userPassed: string;
  keyPassed: string;

  chatString: any;
  chatRef: any;

  picdata: any;
  captureDataUrl: any;
  mypicref: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private alertCtrl: AlertController) {
    //get passed from last page..disp del
    this.userPassed= this.navParams.get('userUsername');
    this.runnerPassed= this.navParams.get('runnerUsername');
    this.keyPassed= this.navParams.get('key');

    this.scrollto();

    this.chatString=`/chatStorage/`+ this.keyPassed+ `/`;
    this.chatRef= firebase.database().ref(this.chatString);

    this.mypicref= firebase.storage().ref('/');

    var temp;
    this.chatRef.on('value', snapshot =>  {
      this.allmessages=[];
      snapshot.forEach(childSnapshot => {

        temp=childSnapshot.val();
        this.allmessages.push(temp);
      });

    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatRPage');
  }

  addnewmessage(msg) {
    if (this.runnerPassed) {
      var promise = new Promise((resolve, reject) => {
        this.chatRef.push({
          sentby: this.runnerPassed,
          message: msg,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        })
        .then(() => {
            resolve(true);
            })
            .catch((err) => {
              reject(err);
            })
        })

      return promise;
    }
  }

  addMessage(){
    this.addnewmessage(this.newmessage).then(() => {
      this.content.scrollToBottom();
      this.newmessage = '';
    })
  }

  scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
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

  upload() {
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
