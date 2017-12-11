import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserMapPage } from './user-map';

@NgModule({
  declarations: [
    UserMapPage,
  ],
  imports: [
    IonicPageModule.forChild(UserMapPage),
  ],
})
export class UserMapPageModule {}
