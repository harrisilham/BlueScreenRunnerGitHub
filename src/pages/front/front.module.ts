import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FrontPage } from './front';

@NgModule({
  declarations: [
    FrontPage,
  ],
  imports: [
    IonicPageModule.forChild(FrontPage),
  ],
})
export class FrontPageModule {}
