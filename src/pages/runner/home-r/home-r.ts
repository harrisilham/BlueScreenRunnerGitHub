import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events, AlertController } from 'ionic-angular';
import { EditrunnerAPage } from '../../admin/editrunner-a/editrunner-a';
import firebase from 'firebase';
import { MemoinfoRPage } from '../memoinfo-r//memoinfo-r'
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

  runnerNode: Array<{availability: String, currentDelivery: string}>=[];

  data={av: true};

  public availability=[];
  public username=[];
  public currentDelivery=[];

  bioR: string;
  coverArea: string;
  usernamePassed: any;

  pathString: any;
  pathRef: any;

  //for delivery
  delivery: Array<{accepted: string, additional: string, runnerUsername: string, userUsername: string}>=[];

  public accepted=[];
  public additional=[];
  public runnerUsername=[];
  public userUsername=[];
  public key=[];

  delString: any;
  delRef: any;

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
        this.currentDelivery[index]= childSnapshot.child("/currentDelivery/").val();

        //push into array object
        if(this.username[index]==<string>this.usernamePassed){//check for selected runner to edit
          this.runnerNode[0]=({availability: this.availability[index], currentDelivery: this.currentDelivery[index] });

          var boolAv= false;

          if(<string>this.availability[index]=="true")boolAv=true;

          this.data=({av: boolAv});

        }
      });
    });



    //set pathstring to the current username
    this.pathString = `/runnerStorage/`+ this.usernamePassed+ `/` ;

    //delivery req
    this.delString= `/deliveryStorage/`;
    this.delRef= firebase.database().ref(this.delString);


    this.delRef.on('value', snapshot => {
      var index=0;

      snapshot.forEach(childSnapshot => {
        this.key[index]= childSnapshot.key;

        if(this.key[index]==this.currentDelivery[0]){
          //get del data
          this.accepted[index]=  childSnapshot.child("/accepted/").val();
          this.additional[index]= childSnapshot.child("/additional/").val();
          this.runnerUsername[index]= childSnapshot.child("/runnerUsername/").val();
          this.userUsername[index]= childSnapshot.child("/userUsername/").val();

          //push into array object
          this.delivery[0]=({accepted: this.accepted[index], additional: this.additional[index], runnerUsername: this.runnerUsername[index], userUsername: this.userUsername[index] });

        }

      });
    });

  }
  test(){
    document.write(<string>this.runnerNode[0].availability)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeRPage');
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
          this.runnerNode.push({availability: this.availability[index], currentDelivery: this.currentDelivery[index] });
        }
      });
    });

    if(this.availability[0]=="true")return true;
    else return false;

  }
  review(){
      this.navCtrl.push(MemoinfoRPage, {
        username: <string>this.usernamePassed
      });
  }
}
