import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomeAPage } from '../pages/admin/home-a/home-a';
import { ListPage } from '../pages/list/list';
import { SignInAPage } from '../pages/admin/sign-inA/sign-inA';
import { FrontPage } from '../pages/front/front';
import { SignInRPage } from '../pages/runner/sign-in-r/sign-in-r'
import { SignInUPage } from '../pages/user/sign-in-u/sign-in-u'
import { HomeRPageModule } from '../pages/runner/home-r/home-r.module'
import { HomeUPageModule } from '../pages/user/home-u/home-u.module';
import { SignUpUPage } from '../pages/user/sign-up-u/sign-up-u';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AddrunnerAPage } from '../pages/admin/addrunner-a/addrunner-a';
import { DeleterunnerAPage } from '../pages/admin/deleterunner-a/deleterunner-a';
import { EditrunnerAPage } from '../pages/admin/editrunner-a/editrunner-a';
import { ViewrunnerAPage } from '../pages/admin/viewrunner-a/viewrunner-a';

@NgModule({
  declarations: [
    MyApp,
    HomeAPage,
    ListPage,
    SignInAPage,
    FrontPage,
    SignInRPage,
    SignInUPage,
    //HomeRPage,
    //HomeUPage,
    SignUpUPage,
    AddrunnerAPage,
    DeleterunnerAPage,
    EditrunnerAPage,
    ViewrunnerAPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HomeRPageModule,
    HomeUPageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomeAPage,
    ListPage,
    SignInAPage,
    FrontPage,
    SignInRPage,
    SignInUPage,
    //HomeRPage,
    //HomeUPage,
    SignUpUPage,
    AddrunnerAPage,
    DeleterunnerAPage,
    EditrunnerAPage,
    ViewrunnerAPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FrontPage,
  ]
})
export class AppModule {}
