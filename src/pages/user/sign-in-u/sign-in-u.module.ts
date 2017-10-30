import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignInUPage } from './sign-in-u';

@NgModule({
  declarations: [
    SignInUPage,
  ],
  imports: [
    IonicPageModule.forChild(SignInUPage),
  ],
})
export class SignInUPageModule {}
