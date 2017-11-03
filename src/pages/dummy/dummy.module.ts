import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DummyPage } from './dummy';

@NgModule({
  declarations: [
    DummyPage,
  ],
  imports: [
    IonicPageModule.forChild(DummyPage),
  ],
})
export class DummyPageModule {}
