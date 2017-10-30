import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignInAPage } from './sign-inA';

@NgModule({
  declarations: [
    SignInAPage,
  ],
  imports: [
    IonicPageModule.forChild(SignInAPage),
  ],
})
export class SignInPageModule {}
