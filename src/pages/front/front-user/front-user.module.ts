import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FrontUserPage } from './front-user';

@NgModule({
  declarations: [
    FrontUserPage,
  ],
  imports: [
    IonicPageModule.forChild(FrontUserPage),
  ],
})
export class FrontUserPageModule {}
