import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeUPage } from './home-u';

@NgModule({
  declarations: [
    HomeUPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeUPage),
  ],
})
export class HomeUPageModule {}
