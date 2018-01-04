import { NgModule} from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeRPage } from './home-r';

@NgModule({
  declarations: [
    HomeRPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeRPage),
  ],
})

export class HomeRPageModule {}
