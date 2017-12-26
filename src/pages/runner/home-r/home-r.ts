import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events, AlertController, Platform } from 'ionic-angular';
import { EditrunnerAPage } from '../../admin/editrunner-a/editrunner-a';
import { DispDelInfoRPage } from '../disp-del-info-r/disp-del-info-r';
import { ChatRPage } from '../chat-r/chat-r';

import firebase from 'firebase';

import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker,
 LatLng
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

declare var google;

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
  @ViewChild('map')
  private mapElement: ElementRef;
  map:any;
  private location:LatLng;
  activeMenu: string = 'menu-r'

  runnerNode: Array<{availability: String, currentDelivery: string, acceptedDel: string}>=[];

  data={av: true};//for toggle availability

  public availability=[];
  public username=[];
  public currentDelivery=[];
  public acceptedDel=[];

  usernamePassed: any;

  pathString: any;
  pathRef: any;

  //for delivery
  delivery: Array<{accepted: string, additional: string, runnerUsername: string, title: string, userUsername: string, payment: string, distance: string, tLat: number, tLng: number, uLat: number, uLng: number, rLat: number, rLng: number}>=[];

  haveDel= 0;
  haveAcc= 0;

  public accepted=[];
  public additional=[];
  public runnerUsername=[];
  public title=[];
  public userUsername=[];
  public payment=[];
  public distance=[];
  public uLat=[];
  public uLng=[];
  public tLat=[];
  public tLng=[];
  public rLat=[];
  public rLng=[];
  public key=[];

  uLoc: LatLng;
  tLoc: LatLng;


  currentKey: any;

  delString: any;
  delRef: any;

  //for del accepted
  deliveryA: Array<{accepted: string, additional: string, runnerUsername: string, title: string, userUsername: string, payment: string, distance: string, tLat: number, tLng: number, uLat: number, uLng: number, rLat: number, rLng: number}>=[];


  public acceptedA=[];
  public additionalA=[];
  public runnerUsernameA=[];
  public titleA=[];
  public userUsernameA=[];
  public keyA=[];

  currentKeyA: any;

  delStringA: any;
  delRefA: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private menu: MenuController, public events: Events, private alertCtrl: AlertController, private googleMaps: GoogleMaps, private geolocation: Geolocation, private platform: Platform, public zone: NgZone, private launchNavigator: LaunchNavigator, private backgroundGeolocation: BackgroundGeolocation) {
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
                  this.payment[index]= childSnapshot.child("/payment/").val();
                  this.distance[index]= childSnapshot.child("/distance/").val();
                  this.uLat[index]= childSnapshot.child("/uLat/").val();
                  this.uLng[index]= childSnapshot.child("/uLng/").val();
                  this.tLat[index]= childSnapshot.child("/tLat/").val();
                  this.tLng[index]= childSnapshot.child("/tLng/").val();
                  this.rLat[index]= childSnapshot.child("/rLat/").val();
                  this.rLng[index]= childSnapshot.child("/rLng/").val();


                  //push into array object
                  this.delivery[0]=({accepted: this.accepted[index], additional: this.additional[index], runnerUsername: this.runnerUsername[index], title: this.title[index], userUsername: this.userUsername[index], payment: this.payment[index], distance: this.distance[index], tLat: <number>this.tLat[index], tLng: <number>this.tLng[index], uLat: <number>this.uLat[index], uLng: <number>this.uLng[index], rLat: <number>this.rLat[index], rLng: <number>this.rLng[index] });

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
                  this.payment[index]= childSnapshot.child("/payment/").val();
                  this.distance[index]= childSnapshot.child("/distance/").val();
                  this.uLat[index]= childSnapshot.child("/uLat/").val();
                  this.uLng[index]= childSnapshot.child("/uLng/").val();
                  this.tLat[index]= childSnapshot.child("/tLat/").val();
                  this.tLng[index]= childSnapshot.child("/tLng/").val();
                  this.rLat[index]= childSnapshot.child("/rLat/").val();
                  this.rLng[index]= childSnapshot.child("/rLng/").val();

                  //push into array object
                  this.delivery[0]=({accepted: this.accepted[index], additional: this.additional[index], runnerUsername: this.runnerUsername[index], title: this.title[index], userUsername: this.userUsername[index], payment: this.payment[index], distance: this.distance[index], uLat: <number>this.uLat[index], uLng: <number>this.uLng[index], tLat: <number>this.tLat[index], tLng: <number>this.tLng[index], rLat: <number>this.rLat[index], rLng: <number>this.rLng[index]  });

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

    if(this.haveAcc){

      //get direction
      //set path
      this.pathString= `/runnerStorage/`+ this.usernamePassed+ `/` ;
      this.pathRef= firebase.database().ref(this.pathString);
      this.pathRef.on('value', snapshot => {
      this.uLat[0]= snapshot.child("/uLat/").val();
      this.uLng[0]= snapshot.child("/uLng/").val();
      this.tLat[0]= snapshot.child("/tLat/").val();
      this.tLng[0]= snapshot.child("/tLng/").val();
      //this.rLat[0]= snapshot.child("/rLat/").val();
      //this.rLng[0]= snapshot.child("/rLng/").val();

      //get user current pos
      this.geolocation.getCurrentPosition().then( pos=> {
        this.rLat[0]= pos.coords.latitude;
        this.rLng[0]= pos.coords.longitude;

        //create map
        this.addMap(this.rLat[0], this.rLng[0]);

        //update r loc to db
        this.pathRef.update({
          rLat: this.rLat[0],
          rLng: this.rLng[0]
        })

        //set uLoc n tLoc
        this.uLoc= new google.maps.LatLng(this.uLat[0], this.uLng[0]);
        this.tLoc= new google.maps.LatLng(this.tLat[0], this.tLng[0]);
        console.log("uLoc: "+ this.uLoc)
        console.log("tLoc: "+ this.tLoc)

        var dir= new google.maps.DirectionsService;
        var dirDisplay = new google.maps.DirectionsRenderer;
        dirDisplay.setMap(this.map);

        dir.route({
            origin: this.tLoc,
            destination: this.uLoc,
            travelMode: 'DRIVING'
          }, function(response, status) {
            if (status === 'OK') {
              dirDisplay.setDirections(response);
            } else {
              //window.alert('Directions request failed due to ' + status);
            }
          });

        let options = {
          target: this.location,
          zoom: 8
        };

        //this.map.moveCamera(options);
      }).catch((error) => {
          console.log('Error getting location', error);
        });





      })
    }
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

  addMap(lat,long){

    let latLng = new google.maps.LatLng(lat, long);


    let mapOptions = {
    center: latLng,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker(lat, long, "ME");

  }

  addMarker(lat, lng, des){

    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: {lat: lat, lng: lng}
    });

    let infoWindow = new google.maps.InfoWindow({
    content: des
    });

    google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
    });


  }

  launchNavA(){
    //set path
    this.pathString= `/runnerStorage/`+this.usernamePassed+ `/` ;
    this.pathRef= firebase.database().ref(this.pathString);

    //setup background location
    const config: BackgroundGeolocationConfig = {
            desiredAccuracy: 5,
            stationaryRadius: 5,
            distanceFilter: 5,
            interval: 1000,
            debug: true, //  enable this hear sounds for background-geolocation life-cycle.
            stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };

    this.backgroundGeolocation.configure(config)
      .subscribe((location: BackgroundGeolocationResponse) => {
        console.log(location);
        //update db
        this.pathRef.update({
         rLat: location.latitude,
         rLng: location.longitude
         })
      });

      //start background tracking
      this.backgroundGeolocation.start();


    //foreground tracking
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
     //update db
     this.pathRef.update({
      rLat: data.coords.latitude,
      rLng: data.coords.longitude
      })
    });

    //open navigation
    this.launchNavigator.navigate([this.tLat[0], this.tLng[0]]);
  }

  launchNavB(){
    //set path
    this.pathString= `/runnerStorage/`+this.usernamePassed+ `/` ;
    this.pathRef= firebase.database().ref(this.pathString);

    //setup background location
    const config: BackgroundGeolocationConfig = {
            desiredAccuracy: 5,
            stationaryRadius: 5,
            distanceFilter: 5,
            interval: 1000,
            debug: true, //  enable this hear sounds for background-geolocation life-cycle.
            stopOnTerminate: false, // enable this to clear background location settings when the app terminates
    };

    this.backgroundGeolocation.configure(config)
      .subscribe((location: BackgroundGeolocationResponse) => {
        console.log(location);
        //update db
        this.pathRef.update({
         rLat: location.latitude,
         rLng: location.longitude
         })
      });

      //start background tracking
      this.backgroundGeolocation.start();


    //foreground tracking
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
     //update db
     this.pathRef.update({
      rLat: data.coords.latitude,
      rLng: data.coords.longitude
      })
    });

    //open navigation
    this.launchNavigator.navigate([this.uLat[0], this.uLng[0]]);
  }

  stopBackgroundLocation(){

  }

  doneButton(){
    var path= `/deliveryStorage/` + <string>this.currentKey+ `/`;
    var ref= firebase.database().ref(path)
    ref.update({
      accepted:"doneReq"
    })

    this.pathRef= firebase.database().ref(this.pathString);
    this.pathRef.update({
      acceptedDel: "none",
      currentDelivery: "none"
    })

    //stop background location
    this.backgroundGeolocation.stop();

    //alert wait for user confirmation
    this.presentAlertWait();

    //alert user has confirmed
    ref.on('value', snapshot => {
      var settle= snapshot.child("accepted").val();

      if(settle=="done"){
        this.presentAlertDone();
      }
    })
  }

  cancelButton(){
    var path= `/deliveryStorage/` + <string>this.currentKey+ `/`;
    var ref= firebase.database().ref(path)
    ref.update({
      accepted:"cancel"
    })

    this.pathRef= firebase.database().ref(this.pathString);
    this.pathRef.update({
      currentDelivery: "none"
    })

    //stop background location
    this.backgroundGeolocation.stop();

    //go home...
    this.navCtrl.setRoot(HomeRPage, {
      username: <string>this.usernamePassed
    });
  }

  presentAlertWait() {
    let alert = this.alertCtrl.create({
      title: 'WAIT FOR USER CONFIRMATION',
      buttons: ['Okay']
    });
    alert.present();
  }

  presentAlertDone() {
    let alert = this.alertCtrl.create({
      title: 'DELIVERY DONE',
      buttons: ['Okay']
    });
    alert.present();

    // refresh home page
    setTimeout(() => {
      console.log('Async operation has ended');
      this.navCtrl.setRoot(HomeRPage, {
        username: <string> this.usernamePassed
      });
    }, 2000);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      this.navCtrl.setRoot(HomeRPage, {
        username: <string> this.usernamePassed
      });
      refresher.complete();
    }, 2000);
  }

}
