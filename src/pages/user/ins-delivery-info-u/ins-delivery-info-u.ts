import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, Platform } from 'ionic-angular';
import { ChooseRunnerUPage } from '../choose-runner-u/choose-runner-u';
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

import firebase from 'firebase';

/**
 * Generated class for the InsDeliveryInfoUPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ins-delivery-info-u',
  templateUrl: 'ins-delivery-info-u.html',
})
export class InsDeliveryInfoUPage {
  @ViewChild('map')
  private mapElement: ElementRef;
  private map:GoogleMap;
  private location:LatLng;

  usernamePassed: any;
  runnerPassed: any;
  title: string;

  runnerNode: Array<{email: String, fullName: String, phoneNum: number, username: String, rating: number, deliveryCount: number, biodata: String}>;

  deliveryNode: Array<{accepted: string, deliveryId: number, runnerUsername: string, userUsername: string}>;

  pathString: any;
  pathRef: any;

  public email=[];
  public fullName=[];
  public phoneNum=[];
  public username=[];
  public rating=[];
  public deliveryCount=[];
  public biodata=[];

  uLat: any;
  uLng: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private alertCtrl: AlertController, private googleMaps: GoogleMaps, private geolocation: Geolocation, private platform: Platform) {
    //get passed from last page..ins-title
    this.usernamePassed= navParams.get('username');
    this.title= navParams.get('title');

    //db initial
    this.pathString= `/deliveryStorage/`;
    this.pathRef= firebase.database().ref(this.pathString);

    //get user current pos
    this.geolocation.getCurrentPosition().then( pos=> {
      this.uLat= pos.coords.latitude;
      this.uLng= pos.coords.longitude;
      this.location = new LatLng(this.uLat, this.uLng);
    }).catch((error) => {
        console.log('Error getting location', error);
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsDeliveryInfoUPage');

    this.platform.ready().then(() => {
      let element = this.mapElement.nativeElement;
      this.map = this.googleMaps.create(element);

      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        let options = {
          target: this.location,
          zoom: 8
        };

        this.map.moveCamera(options);
      });
    });
  }

  go(){

    //get frm textarea
    var additional= (<HTMLInputElement>document.getElementById('additionalInfo')).value;

    this.navCtrl.push(ChooseRunnerUPage,{
      username: this.usernamePassed,
      title: this.title,
      additional: additional
    });
  }

  presentAlert() {
   let alert = this.alertCtrl.create({
     title: 'New Delivery Requested!!',
     subTitle: 'Please wait for runner confirmation..',
     buttons: ['OK']
  });
   alert.present();
  }
}
