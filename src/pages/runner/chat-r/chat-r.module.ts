import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatRPage } from './chat-r';

@NgModule({
  declarations: [
    ChatRPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatRPage),
  ],
})
export class ChatRPageModule {}
