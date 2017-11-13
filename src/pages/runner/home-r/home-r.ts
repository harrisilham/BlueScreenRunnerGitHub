import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController} from 'ionic-angular';
import { EditrunnerAPage } from '../../admin/editrunner-a/editrunner-a';
import { AvailabilityPage} from '../availability/availability';
import firebase from 'firebase';
import { Events } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { EditrunnerPage} from '../editrunner/editrunner';
/**
 * Generated class for the HomeRPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-r',
  templateUrl: 'home-r.html',
})
export class HomeRPage {
  activeMenu: string = 'menu-r'

  runnerNode: Array<{availability: String}>=[];
  data={av: true};

  public availability=[];
  public username=[];

  bioR: string;
  coverArea: string;
  usernamePassed: any;

  pathString: any;
  pathRef: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, public events: Events, private alertCtrl: AlertController) {
    //set active menu runner
    this.activeMenu= 'menu-r' ;
    this.menu.enable(false, 'menu-a');
    this.menu.enable(true, 'menu-r') ;
    this.menu.enable(false, 'menu-u');

    //disable tab
    events.publish('user:entered');

    //get passed username
    this.usernamePassed= navParams.get('username');

    //set path
    this.pathString= `/runnerStorage/` ;
    this.pathRef= firebase.database().ref(this.pathString);

    //read availability
    this.pathRef.once('value', snapshot => {
      var index=0;
      snapshot.forEach(childSnapshot => {

        this.availability[index]=  childSnapshot.child("/availability/").val();
        this.username[index]= childSnapshot.child("/username/").val();

        //push into array object
        if(this.username[index]==<string>this.usernamePassed){//check for selected runner to edit
          this.runnerNode.push({availability: this.availability[index] });
        }
      });
    });
    var boolAv= false;
    if(this.availability[0]=="true")boolAv=true;
    this.data=({av: boolAv});

    //set pathstring to the current username
    this.pathString = `/runnerStorage/`+ this.usernamePassed+ `/` ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeRPage');
  }

  profileButton(){
    this.navCtrl.push(EditrunnerPage, {
      username: <string>this.usernamePassed
    });
  }

  availabilitybutton(){
    this.navCtrl.push(AvailabilityPage, {
      username: <string>this.usernamePassed
    });
  }

  availableToggled(){
    this.pathRef= firebase.database().ref(this.pathString);

    //should put if here if toggle on , set true. else false
    if(this.data.av==true){
      this.pathRef.update({
      availability: "true"
      })
    }
    else{
      this.pathRef.update({
      availability: "false"
      })
    }
  }

  getAvailability(){
    //set path
    this.pathString= `/runnerStorage/` ;
    this.pathRef= firebase.database().ref(this.pathString);

    //read availability
    this.pathRef.once('value', snapshot => {
      var index=0;
      snapshot.forEach(childSnapshot => {

        this.availability[index]=  childSnapshot.child("/availability/").val();
        this.username[index]= childSnapshot.child("/username/").val();

        //push into array object
        if(this.username[index]==<string>this.usernamePassed){//check for selected runner to edit
          this.runnerNode.push({availability: this.availability[index] });
        }
      });
    });

    if(this.availability[0]=="true")return true;
    else return false;


  }
}
