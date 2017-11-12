import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomeAPage } from '../pages/admin/home-a/home-a';
import { FrontPage } from '../pages/front/front';
import { SignInRPage } from '../pages/runner/sign-in-r/sign-in-r'
import { SignInUPage } from '../pages/user/sign-in-u/sign-in-u'
import { SignUpUPage } from '../pages/user/sign-up-u/sign-up-u';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AddrunnerAPage } from '../pages/admin/addrunner-a/addrunner-a';
import { DeleterunnerAPage } from '../pages/admin/deleterunner-a/deleterunner-a';
import { EditrunnerAPage } from '../pages/admin/editrunner-a/editrunner-a';
import { ViewrunnerAPage } from '../pages/admin/viewrunner-a/viewrunner-a';
import { AvailabilityPage } from '../pages/runner/availability/availability'
import { ProfileUPage } from '../pages/user/profile-u/profile-u';
import { EditUserUPage } from '../pages/user/profile-u/edit-user-u/edit-user-u';
import { EditrunnerPage } from '../pages/runner/editrunner/editrunner';
import { ChooseRunnerUPage } from '../pages/user/choose-runner-u/choose-runner-u';
import { ConfirmRunnerUPage } from '../pages/user/confirm-runner-u/confirm-runner-u';

import { HomeRPageModule } from '../pages/runner/home-r/home-r.module'
import { HomeUPageModule } from '../pages/user/home-u/home-u.module';
import { ProfileUPageModule } from '../pages/user/profile-u/profile-u.module';


@NgModule({
  declarations: [
    MyApp,
    HomeAPage,
    FrontPage,
    SignInRPage,
    SignInUPage,
    SignUpUPage,
    AddrunnerAPage,
    DeleterunnerAPage,
    EditrunnerAPage,
    ViewrunnerAPage,
    AvailabilityPage,
    ProfileUPage,
    EditrunnerPage,
    EditUserUPage,
    ChooseRunnerUPage,
    ConfirmRunnerUPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HomeRPageModule,
    HomeUPageModule,
    //ProfileUPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomeAPage,
    FrontPage,
    SignInRPage,
    SignInUPage,
    SignUpUPage,
    AddrunnerAPage,
    DeleterunnerAPage,
    EditrunnerAPage,
    ViewrunnerAPage,
    AvailabilityPage,
    ProfileUPage,
    EditrunnerPage,
    EditUserUPage,
    ChooseRunnerUPage,
    ConfirmRunnerUPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FrontPage,
    SignInRPage,
  ]
})
export class AppModule {}
