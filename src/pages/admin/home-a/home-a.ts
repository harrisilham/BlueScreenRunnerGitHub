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
  runner: Array<{email: string, fullName: string, ic: number, password: string, phoneNum: number, username: string}>;

  size: number;

  pathString: any;
  emailString: any;

  pathRef: any;
  emailRef: any;
  fullNameRef: any;
  icRef: any;
  passwordRef: any;
  phoneNumRef: any;

  runnerNode: Array<{email: String, fullName: String, ic: number, password: String, phoneNum: number, username: String}>;
  public runnerList=[];
  test: any;
  testEmail: any;

  public runnerNode2=[]; //tk gunaaa
  public email=[];
  public fullName=[];
  public ic=[];
  public password=[];
  public phoneNum=[];
  public username=[];

  public Username= {};
  public Email= {};

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

        //create table
        var table: HTMLTableElement= <HTMLTableElement>document.getElementById('listRunner');
        var row: HTMLTableRowElement = <HTMLTableRowElement>table.insertRow(-1);
        var cell1: HTMLTableCellElement=<HTMLTableCellElement>row.insertCell(0);
        var cell2: HTMLTableCellElement=<HTMLTableCellElement>row.insertCell(1);
        var cell3: HTMLTableCellElement=<HTMLTableCellElement>row.insertCell(2);
        var cell4: HTMLTableCellElement=<HTMLTableCellElement>row.insertCell(3);

        cell1.innerHTML= index.toString();
        cell2.innerHTML= this.username[index];
        cell3.innerHTML= "<button><ion-icon name='create'>edit</ion-icon> </button>";
        cell4.innerHTML= "<button><ion-icon name='trash'>delete</ion-icon> </button>";

        cell1.style.border=cell2.style.border=cell3.style.border=cell4.style.border= "1px solid ";
        index++;
      });
    });

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

  public incrementSize(){
    this.size++;
  }
}
