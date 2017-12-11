import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RunnerMapPage } from './runner-map';

@NgModule({
  declarations: [
    RunnerMapPage,
  ],
  imports: [
    IonicPageModule.forChild(RunnerMapPage),
  ],
})
export class RunnerMapPageModule {}
