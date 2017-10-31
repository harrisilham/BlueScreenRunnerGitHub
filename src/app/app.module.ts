import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomeAPage } from '../pages/admin/home-a/home-a';
import { ListPage } from '../pages/list/list';
import { SignInAPage } from '../pages/admin/sign-inA/sign-inA';
import { FrontPage } from '../pages/front/front';
import { FrontRunnerPage } from '../pages/front/front-runner/front-runner';
import { FrontUserPage } from '../pages/front/front-user/front-user';
import {SignInRPage} from '../pages/runner/sign-in-r/sign-in-r'
import {SignInUPage} from '../pages/user/sign-in-u/sign-in-u'
import {HomeRPage} from '../pages/runner/home-r/home-r'
import {HomeRPageModule} from '../pages/runner/home-r/home-r.module'
import { HomeUPage } from '../pages/user/home-u/home-u';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomeAPage,
    ListPage,
    SignInAPage,
    FrontPage,
    FrontRunnerPage,
    FrontUserPage,
    SignInRPage,
    SignInUPage,
    //HomeRPage
    HomeUPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HomeRPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomeAPage,
    ListPage,
    SignInAPage,
    FrontPage,
    FrontRunnerPage,
    FrontUserPage,
    SignInRPage,
    SignInUPage,
    //HomeRPage,
    HomeUPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FrontPage
  ]
})
export class AppModule {}
