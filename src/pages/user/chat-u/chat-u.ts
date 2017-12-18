import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content } from 'ionic-angular';

import firebase from 'firebase';

/**
 * Generated class for the ChatUPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat-u',
  templateUrl: 'chat-u.html',
})
export class ChatUPage {
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public zone: NgZone) {
    //get passed from last page..disp del
    this.userPassed= this.navParams.get('userUsername');
    this.runnerPassed= this.navParams.get('runnerUsername');
    this.keyPassed= this.navParams.get('key');

    this.scrollto();

    this.chatString=`/chatStorage/`+ this.keyPassed+ `/`;
    this.chatRef= firebase.database().ref(this.chatString);

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
    console.log('ionViewDidLoad ChatUPage');
  }

  addnewmessage(msg) {
    if (this.userPassed) {
      var promise = new Promise((resolve, reject) => {
        this.chatRef.push({
          sentby: this.userPassed,
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

}
