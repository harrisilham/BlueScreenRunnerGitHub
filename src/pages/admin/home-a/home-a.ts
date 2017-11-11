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
  runnerNode: Array<{index: number, email: String, fullName: String, ic: number, password: String, phoneNum: number, username: String}>=[];

  runnerNodeSearch: Array<{index: number, email: String, fullName: String, ic: number, password: String, phoneNum: number, username: String}>=[];

  pathString: any;
  pathRef: any;

  public runnerList=[];
  test: any;
  testEmail: any;

  public email=[];
  public fullName=[];
  public ic=[];
  public password=[];
  public phoneNum=[];
  public username=[];

  constructor(public navCtrl: NavController, public events: Events) {
    events.publish('user:entered');

    this.pathString= `/runnerStorage/` ;
    this.pathRef= firebase.database().ref(this.pathString);

    //get all data
    this.pathRef.once('value', snapshot => {
      var index=0;
      snapshot.forEach(childSnapshot => {

        this.email[index]=  childSnapshot.child("/email/").val();
        this.fullName[index]=  childSnapshot.child("/fullName/").val();
        this.ic[index]=  childSnapshot.child("/ic/").val();
        this.password[index]=  childSnapshot.child("/password/").val();
        this.phoneNum[index]=  childSnapshot.child("/phoneNum/").val();
        this.username[index]=  childSnapshot.child("/username/").val();

        /*document.writeln(this.email[index]+ "<br>"+ this.fullName[index]+ "<br>"+ this.ic[index]+ "<br>"+ this.password[index]+ "<br>"+ this.phoneNum[index]+ "<br>"+ this.username[index]+ "<br><br>");*/

        //push into array object
        this.runnerNode.push({index: (index+1), email: this.email[index], fullName: this.fullName[index], ic: this.ic[index], password: this.password[index], phoneNum: this.phoneNum[index], username: this.username[index] });
        index++;
      });
    });
    this.initializeRunnerSearch();
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

  initializeRunnerSearch(){
    this.runnerNodeSearch=this.runnerNode;
  }

  getRunner(ev: any){
    // Reset items back to all of the items
    this.initializeRunnerSearch();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.runnerNodeSearch = this.runnerNodeSearch.filter((p) => {
        return (p.username.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
