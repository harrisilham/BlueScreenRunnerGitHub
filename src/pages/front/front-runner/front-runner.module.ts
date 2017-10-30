import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FrontRunnerPage } from './front-runner';

@NgModule({
  declarations: [
    FrontRunnerPage,
  ],
  imports: [
    IonicPageModule.forChild(FrontRunnerPage),
  ],
})
export class FrontRunnerPageModule {}
