import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
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

declare var google;

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
  private map:any;
  private location:LatLng;

  usernamePassed: any;
  runnerPassed: any;
  title: string;

  runnerNode: Array<{email: String, fullName: String, phoneNum: number, username: String, rating: number, deliveryCount: number, biodata: String}>;

  deliveryNode: Array<{accepted: string, deliveryId: number, runnerUsername: string, userUsername: string}>;

  pathString: any;
  pathRef: any;

  //places
  GoogleAutocomplete = new google.maps.places.AutocompleteService();
  autocomplete = { input: '' };
  autocompleteItems = [];

  geocoder: any

  public email=[];
  public fullName=[];
  public phoneNum=[];
  public username=[];
  public rating=[];
  public deliveryCount=[];
  public biodata=[];

  uLat: any;
  uLng: any;
  tLat: any;
  tLng: any;
  tLoc: LatLng;

  dist: any;
  payment: any= 0;



  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, private alertCtrl: AlertController, private googleMaps: GoogleMaps, private geolocation: Geolocation, private platform: Platform, public zone: NgZone) {
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

      //upload user location to firebase
      this.pathString = `/testStorage/userloc`;
      this.pathRef= firebase.database().ref(this.pathString);
      this.pathRef.set({
        lat: this.location.lat,
        lng: this.location.lng
      })

      this.addMap(this.uLat, this.uLng);

      let options = {
        target: this.location,
        zoom: 8
      };

      //this.map.moveCamera(options);
    }).catch((error) => {
        console.log('Error getting location', error);
      });

      this.geocoder = new google.maps.Geocoder;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsDeliveryInfoUPage');

    /*
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
    */
  }

  addMap(lat,long){

    let latLng = new google.maps.LatLng(lat, long);

    let mapOptions = {
    center: latLng,
    zoom: 17,
    mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker(this.uLat, this.uLng);

  }

  addMarker(lat, lng){

    let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: {lat: lat, lng: lng}
    });



    //let content = des;
    let infoWindow = new google.maps.InfoWindow({
    content: "user"
    });

    google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
    });


  }

  updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
  	(predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
    //this.GoogleAutocomplete.setOptions({strictBounds: true});
  }

  selectSearchResult(item){
  //  this.clearMarkers();

    //set target place marker
    this.autocompleteItems = [];

    this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
      if(status === 'OK' && results[0]){

        //this.tLoc= <LatLng>results[0].geometry.location;
        //console.log("tLoc lat: "+this.tLoc.lat)

        let position = {
            lat: results[0].geometry.location.lat,
            lng: results[0].geometry.location.lng
        };



        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map,
          animation: google.maps.Animation.DROP
        });
        this.map.setCenter(results[0].geometry.location);

        //get location of center
        this.tLat= this.map.getCenter().lat();
        this.tLng= this.map.getCenter().lng();

        //upload target location to firebase
        this.pathString = `/testStorage/targetloc`;
        this.pathRef= firebase.database().ref(this.pathString);
        this.pathRef.set({
          lat: this.tLat,
          lng: this.tLng
        })

        let infoWindow = new google.maps.InfoWindow({
        content: "target"
        });

        google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
        });

        var geocoder = new google.maps.Geocoder;

            var service = new google.maps.DistanceMatrixService;

            var origin1= {lat: this.uLat, lng: this.uLng}
            var dest1= {lat: this.tLat, lng: this.tLng}
            console.log(dest1)

            service.getDistanceMatrix({
              origins: [origin1,],
              destinations: [dest1],
              travelMode: 'DRIVING',
              unitSystem: google.maps.UnitSystem.METRIC,
              avoidHighways: false,
              avoidTolls: false
            }, function(response, status) {
              if (status !== 'OK') {
                alert('Error was: ' + status);
              } else {

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
                    this.dist= distance; //distance in m
                  }
                }

                //payment , first 5km => rm3, next km => rm0.50 each
                this.payment= 3;
                if(this.dist>5000){
                  var temp= this.dist - 5000;
                  var tempV= true;
                  while(tempV){
                    this.payment+=0.5;

                    temp-=1000;
                    if(temp<0)tempV= false;
                  }
                }

                console.log(this.payment);
                (<HTMLInputElement>document.getElementById('paymentU')).value=this.payment.toFixed(2);
                (<HTMLInputElement>document.getElementById('distanceU')).value=(this.dist/1000).toFixed(2);

              }
            });
      }
    })




  }

  delay(ms: number) {
    //this.test(Cur)
     return new Promise(resolve => setTimeout(resolve, ms) );
  }

  deleteMarkers(markersArray) {
        for (var i = 0; i < markersArray.length; i++) {
          markersArray[i].setMap(null);
        }
        markersArray = [];
      }

  go(){

    //get frm textarea
    var additional= (<HTMLInputElement>document.getElementById('additionalInfo')).value;
    var tempDist= (<HTMLInputElement>document.getElementById('distanceU')).value;
    var tempPay= (<HTMLInputElement>document.getElementById('paymentU')).value;

    console.log(tempDist+" "+ tempPay)

    this.navCtrl.push(ChooseRunnerUPage,{
      username: this.usernamePassed,
      title: this.title,
      additional: additional,
      uLat: this.uLat,
      uLng: this.uLng,
      tLat: this.tLat,
      tLng: this.tLng,
      distance: tempDist,
      payment: tempPay
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
