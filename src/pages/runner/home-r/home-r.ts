import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events, AlertController } from 'ionic-angular';
import { EditrunnerAPage } from '../../admin/editrunner-a/editrunner-a';
import { DispDelInfoRPage } from '../disp-del-info-r/disp-del-info-r';
import { ChatRPage } from '../chat-r/chat-r';
import { CancelDelRPage } from '../cancel-del-r/cancel-del-r';
import { RunnerMapPage } from '../runner-map/runner-map';
import firebase from 'firebase';
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

  runnerNode: Array<{availability: String, currentDelivery: string, acceptedDel: string}>=[];
  chargeNode: Array<{deliChargeUtm: string, addCharge: string}>=[];
  data={av: true};//for toggle availability

  public availability=[];
  public username=[];
  public currentDelivery=[];
  public acceptedDel=[];

  usernamePassed: any;

  pathString: any;
  pathRef: any;
  pathStringCharge:any;
  dataRef: firebase.database.Reference;

  //for delivery
  delivery: Array<{accepted: string, additional: string, runnerUsername: string, title: string, userUsername: string}>=[];

  haveDel= 0;
  haveAcc= 0;

  public accepted=[];
  public additional=[];
  public runnerUsername=[];
  public title=[];
  public userUsername=[];
  public key=[];
  public done=[];

  currentKey: any;

  delString: any;
  delRef: any;

  //for del accepted
  deliveryA: Array<{accepted: string, done: string, additional: string, runnerUsername: string, title: string, userUsername: string}>=[];


  public acceptedA=[];
  public additionalA=[];
  public runnerUsernameA=[];
  public titleA=[];
  public userUsernameA=[];
  public keyA=[];
  public doneA=[];

  currentKeyA: any;

  delStringA: any;
  delRefA: any;
  public deliChargeUtm={};
  public addCharge={};
  pathRefCharge: firebase.database.Reference;
  pathRefAddCharge:firebase.database.Reference;

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

    this.pathRef.on('value', snapshot => {
      var index=0;
      snapshot.forEach(childSnapshot => {

        this.availability[index]=  childSnapshot.child("/availability/").val();
        this.username[index]= childSnapshot.child("/username/").val();
        this.currentDelivery[index]= childSnapshot.child("/currentDelivery/").val();
        this.acceptedDel[index]= childSnapshot.child("/acceptedDel/").val();


        //push into array object
        if(this.username[index]==<string>this.usernamePassed){//check for selected runner to edit
          this.runnerNode[0]=({availability: this.availability[index], currentDelivery: this.currentDelivery[index], acceptedDel: this.acceptedDel[index] });

          //check accepted del
          if(this.acceptedDel[index]!="none") {
            this.haveAcc=1;

            //accepted del
            this.delString= `/deliveryStorage/`;
            this.delRef= firebase.database().ref(this.delString);


            this.delRef.on('value', snapshot => {
              var index=0;

              snapshot.forEach(childSnapshot => {
                this.key[index]= childSnapshot.key;

                //document.write(this.runnerNode[0].currentDelivery+ " "+ this.key[index]+ "<br>")

                if(this.key[index]==this.runnerNode[0].acceptedDel){
                  this.currentKey= this.key[index];
                  //get del data
                  this.accepted[index]=  childSnapshot.child("/accepted/").val();
                  this.additional[index]= childSnapshot.child("/additional/").val();
                  this.runnerUsername[index]= childSnapshot.child("/runnerUsername/").val();
                  this.title[index]= childSnapshot.child("/title/").val();
                  this.userUsername[index]= childSnapshot.child("/userUsername/").val();


                  //push into array object
                  this.delivery[0]=({accepted: this.accepted[index], additional: this.additional[index], runnerUsername: this.runnerUsername[index], title: this.title[index], userUsername: this.userUsername[index] });

                }

              });
            });
          }
          else{
            //delivery req
            this.delString= `/deliveryStorage/`;
            this.delRef= firebase.database().ref(this.delString);


            this.delRef.on('value', snapshot => {
              var index=0;

              snapshot.forEach(childSnapshot => {
                this.key[index]= childSnapshot.key;

                //document.write(this.runnerNode[0].currentDelivery+ " "+ this.key[index]+ "<br>")

                if(this.key[index]==this.runnerNode[0].currentDelivery){
                  this.haveDel= 1;
                  this.currentKey= this.key[index];
                  //get del data
                  this.accepted[index]=  childSnapshot.child("/accepted/").val();
                  this.additional[index]= childSnapshot.child("/additional/").val();
                  this.runnerUsername[index]= childSnapshot.child("/runnerUsername/").val();
                  this.title[index]= childSnapshot.child("/title/").val();
                  this.userUsername[index]= childSnapshot.child("/userUsername/").val();


                  //push into array object
                  this.delivery[0]=({accepted: this.accepted[index], additional: this.additional[index], runnerUsername: this.runnerUsername[index], title: this.title[index], userUsername: this.userUsername[index] });

                }

              });
            });
          }

          var boolAv= false;

          //availability bool
          if(<string>this.availability[index]=="true")boolAv=true;

          this.data=({av: boolAv});



        }
      });
    });

    //document.write(this.runnerNode[0].currentDelivery+"<br>")

    //set pathstring to the current username
    this.pathString = `/runnerStorage/`+ this.usernamePassed+ `/` ;



  }
  test(){
    document.write(<string>this.runnerNode[0].availability)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeRPage');
    this.getData();
  }
  async getData(){
    //get charge data
    this.pathStringCharge= `/chargeStorage/`;

    this.pathRefCharge= firebase.database().ref(this.pathStringCharge+ 'deliChargeUtm/');
    this.pathRefCharge.on('value', snapshot =>  {
      this.deliChargeUtm = snapshot.val();

    });

    this.pathRefAddCharge=firebase.database().ref(this.pathStringCharge+ 'addCharge/');
    this.pathRefAddCharge.on('value', snapshot =>  {
      this.addCharge = snapshot.val();

    });

    this.chargeNode[0]={deliChargeUtm: <string>this.deliChargeUtm, addCharge: <string>this.addCharge}
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
    this.pathRef.on('value', snapshot => {
      var index=0;
      snapshot.forEach(childSnapshot => {

        this.availability[index]=  childSnapshot.child("/availability/").val();
        this.username[index]= childSnapshot.child("/username/").val();

        //push into array object
        if(this.username[index]==<string>this.usernamePassed){//check for selected runner to edit
          this.runnerNode.push({availability: this.availability[index], currentDelivery: this.currentDelivery[index], acceptedDel: this.acceptedDel[index] });
        }
      });
    });

    if(this.availability[0]=="true")return true;
    else return false;

  }
  review(){
      this.navCtrl.push(DispDelInfoRPage, {
        username: <string>this.usernamePassed,
        runnerNode: this.runnerNode[0],
        delivery: this.delivery[0],
        pathString: this.pathString,
        delString: this.delString+this.currentKey,
        key: this.currentKey
      });

  }

  goChat(){
    this.navCtrl.push(ChatRPage, {
      userUsername: <string>this.userUsername[0],
      runnerUsername: <string>this.runnerUsername[0],
      key: <string>this.currentKey
    })
  }

cancelButton(){
  this.navCtrl.push(CancelDelRPage, {
    username: <string>this.usernamePassed,
    runnerNode: this.runnerNode[0],
    delivery: this.delivery[0],
    pathString: this.pathString,
    delString: this.delString+this.currentKey,
    key: this.currentKey
  });

}
goMap(){
  this.navCtrl.push(RunnerMapPage, {
    userUsername: <string>this.userUsername[0],
    runnerUsername: <string>this.runnerUsername[0],
    key: <string>this.currentKey
  })
}

confirmDone(){

    
        this.delString= `/deliveryStorage/`+ this.key + `/` ;

        this.delRef= firebase.database().ref(this.delString);
        this.delRef.update({
        done: "true",
        accepted: "false"
        })

        this.pathString= `/runnerStorage/`+ this.usernamePassed+ `/`;
        this.pathRef= firebase.database().ref(this.pathString);
        this.pathRef.update({
        acceptedDel: "none",
        currentDelivery: "none"
        })

       this.navCtrl.setRoot(HomeRPage, {
       username: <string>this.usernamePassed,
       runnerNode: this.runnerNode[0],
       delivery: this.delivery[0],
       pathString: this.pathString,
       delString: this.delString+this.currentKey,
       key: this.currentKey
       });
       this.doneAlert(); 

      }

      doneAlert() {
              let alert = this.alertCtrl.create({
                title: 'You successfully done the delivery',
                subTitle: '',
                buttons: ['Ok']
              });
              alert.present();
            }

}
