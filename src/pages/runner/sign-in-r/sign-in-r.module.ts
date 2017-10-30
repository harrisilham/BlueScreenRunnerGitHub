import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignInRPage } from './sign-in-r';

@NgModule({
  declarations: [
    SignInRPage,
  ],
  imports: [
    IonicPageModule.forChild(SignInRPage),
  ],
})
export class SignInPageModule {}
