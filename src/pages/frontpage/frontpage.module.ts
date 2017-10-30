import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FrontpagePage } from './frontpage';
import { SignInPage } from './sign-in';
import { SigninrunnerPage } from './signinrunner';

@NgModule({
  declarations: [
    FrontpagePage,
  ],
  imports: [
    IonicPageModule.forChild(FrontpagePage),
  ],
})
export class FrontpagePageModule {}
