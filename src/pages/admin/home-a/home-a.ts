import { Component } from '@angular/core';
import { NavController, Events} from 'ionic-angular';
import firebase from 'firebase';

import { AddrunnerAPage } from '../addrunner-a/addrunner-a';
import { DeleterunnerAPage } from '../deleterunner-a/deleterunner-a';
import { EditrunnerAPage } from '../editrunner-a/editrunner-a';
import { ViewrunnerAPage } from '../viewrunner-a/viewrunner-a';

@Component({
  selector: 'page-home-a',
  templateUrl: 'home-a.html'
})
export class HomeAPage {

  username:any;
  email:any;
  pathString: any;

  usernameRef: firebase.database.Reference;
  emailRef: firebase.database.Reference;

  public Username= {};
  public Email= {};

  viewListRunner(){
    this.pathString= firebase.database().ref("runnerStorage").orderByKey();
    this.pathString.once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        // key will be "ada" the first time and "alan" the second time
        var key = childSnapshot.key;
        // childData will be the actual contents of the child
        var childData = childSnapshot.val();
      });
    });
/*
      this.pathString = `/runnerStorage/`+ this.username+ `/` ;

      this.usernameRef= firebase.database().ref(this.pathString+'email/');
      this.usernameRef.on('value', dataSnapshot => { this.Username = dataSnapshot.val();})
    }*/
  }
  constructor(public navCtrl: NavController, public events: Events) {
    events.publish('user:entered');
  }

  viewButton(event, item){
    this.navCtrl.push(ViewrunnerAPage);
  }

  addButton(event, item){
    this.navCtrl.push(AddrunnerAPage);
  }

  editButton(event, item){
    this.navCtrl.push(EditrunnerAPage);
  }

  deleteButton(event, item){
    this.navCtrl.push(DeleterunnerAPage);
  }
}
