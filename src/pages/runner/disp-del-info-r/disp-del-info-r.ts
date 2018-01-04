import { Component, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { HomeRPage } from '../home-r/home-r';

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

declare var google;

/**
 * Generated class for the DispDelInfoRPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-disp-del-info-r',
  templateUrl: 'disp-del-info-r.html',
})
export class DispDelInfoRPage {
  @ViewChild('map')
  private mapElement: ElementRef;
  private map:any;
  private location:LatLng;

  runnerNode: Array<{availability: String, currentDelivery: string}>=[];

  usernamePassed: any;

  delivery: Array<{accepted: string, additional: string, runnerUsername: string, title: string, userUsername: string, payment: string, distance: string, uLat: number, uLng: number, tLat: number, tLng: number}>=[];

  pathRef: any;
  pathString: any;

  delRef: any;
  delString: any;

  key:any;

  rLat: any;
  rLng: any;

  rLoc: LatLng;
  uLoc: LatLng;
  tLoc: LatLng;

  distA: any;
  distB: any;
  distTotal: any;

  pathTemp: any;
  refTemp: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps, private geolocation: Geolocation, private platform: Platform, public zone: NgZone) {

    //get passed var
    this.usernamePassed= navParams.get('username');
    this.runnerNode[0]= navParams.get('runnerNode');
    this.delivery[0]= navParams.get('delivery');
    this.pathString= navParams.get('pathString');
    this.delString= navParams.get('delString');
    this.key= navParams.get('key');

    //get runner current loc
    this.geolocation.getCurrentPosition().then( pos=> {
      this.rLat= pos.coords.latitude;
      this.rLng= pos.coords.longitude;
      this.location = new LatLng(this.rLat, this.rLng);

      //upload runner location to firebase
      this.pathString = `/runnerStorage/`+this.usernamePassed+ `/`;
      this.pathRef= firebase.database().ref(this.pathString);

      //MOCK LOCATION ONLY DIS ONE, LATER UBAH<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      this.pathRef.update({
        rLat: this.location.lat,
        rLng: this.location.lng,
        uLat: this.delivery[0].uLat,
        uLng: this.delivery[0].uLng,
        tLat: this.delivery[0].tLat,
        tLng: this.delivery[0].tLng,
      })

      this.addMap (this.rLat, this.rLng); //MOCK LOCATION ONLY DIS ONE, LATER UBAH<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

      //set uLoc n tLoc
      this.uLoc= new google.maps.LatLng(this.delivery[0].uLat, this.delivery[0].uLng);
      this.tLoc= new google.maps.LatLng(this.delivery[0].tLat, this.delivery[0].tLng);

      //get distance frm t to u
      this.distB= parseFloat(this.delivery[0].distance);

      //get direction
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
            window.alert('Directions request failed due to ' + status);
          }
        });

        //set map center to runner pos
        this.rLoc= new google.maps.LatLng(this.rLat, this.rLng);//MOCK LOCATION ONLY DIS ONE, LATER UBAH<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        this.map.setCenter(this.rLoc);



        //get distance frm r to t
        var service = new google.maps.DistanceMatrixService;

        service.getDistanceMatrix({
          origins: [this.rLoc],
          destinations: [this.tLoc],
          travelMode: 'DRIVING',
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          }
          else {

            var origins = response.originAddresses;
            var destinations = response.destinationAddresses;


            for (var i = 0; i < origins.length; i++) {
              var results = response.rows[i].elements;
              for (var j = 0; j < results.length; j++) {
                var element = results[j];
                var distance = element.distance.value;
                var duration = element.duration.value;
                var from = origins[i];
                var to = destinations[j];
                this.distA= parseFloat( (distance/1000).toFixed(2) ); //distance in m
                (<HTMLInputElement>document.getElementById('distA')).value= this.distA;
              }

            }
          }
        }, function(){


          this.distTotal= this.distA+ this.distB;
          (<HTMLInputElement>document.getElementById('distA')).value= this.distA;
          (<HTMLInputElement>document.getElementById('distTotal')).value= this.distTotal;

        })
    }).catch((error) => {
        console.log('Error getting location', error);
      });


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

  ionViewDidLoad() {
    console.log('ionViewDidLoad DispDelInfoRPage');
  }

  acceptButton(){
    var key;
    this.delRef= firebase.database().ref(this.delString);
    this.delRef.update({
    accepted: "true",
    })

    this.pathRef= firebase.database().ref(this.pathString);
    this.pathRef.update({
      acceptedDel: this.key,
      currentDelivery: "none"
    })

    this.navCtrl.setRoot(HomeRPage, {
      username: <string>this.usernamePassed
    });
  }

  rejectButton(){
    this.delRef= firebase.database().ref(this.delString);
    this.delRef.update({
    accepted: "reject",
    })

    this.pathRef= firebase.database().ref(this.pathString);
    this.pathRef.update({
      currentDelivery: "none"
    })

    this.navCtrl.setRoot(HomeRPage, {
      username: <string>this.usernamePassed
    });
  }

}
