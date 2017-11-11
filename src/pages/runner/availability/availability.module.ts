import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvailabilityPage } from './availability';

@NgModule({
  declarations: [
    AvailabilityPage,
  ],
  imports: [
    IonicPageModule.forChild(AvailabilityPage),
  ],
})
export class AvailabilityPageModule {}
