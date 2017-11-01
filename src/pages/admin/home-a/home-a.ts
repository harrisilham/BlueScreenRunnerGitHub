import { Component } from '@angular/core';
import { NavController, Events} from 'ionic-angular';

import { AddrunnerAPage } from '../addrunner-a/addrunner-a';
import { DeleterunnerAPage } from '../deleterunner-a/deleterunner-a';
import { EditrunnerAPage } from '../editrunner-a/editrunner-a';
import { ViewrunnerAPage } from '../viewrunner-a/viewrunner-a';

@Component({
  selector: 'page-home-a',
  templateUrl: 'home-a.html'
})
export class HomeAPage {

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
