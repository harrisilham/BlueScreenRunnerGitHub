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
  picurl: any;
  mypicref: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private Camera: Camera, private alertCtrl: AlertController) {
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
    this.Camera.getPicture({
      quality:100,
      destinationType:this.Camera.DestinationType.DATA_URL,
      sourceType:this.Camera.PictureSourceType.CAMERA,
      encodingType:this.Camera.EncodingType.PNG,
      saveToPhotoAlbum:true
    }).then(imagedata=>{
      this.picdata=imagedata;
      this.upload();
    })
  }

  upload() {
      this.mypicref.child(this.uid()).child('pic.png')
      .putString(this.picdata,'base64',{contentType:'image/png'})
      .then(savepic=>{
        this.picurl=savepic.downloadURL
      })

    }

    uid() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
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
