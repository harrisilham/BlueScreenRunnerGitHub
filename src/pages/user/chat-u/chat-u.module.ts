import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatUPage } from './chat-u';

@NgModule({
  declarations: [
    ChatUPage,
  ],
  imports: [
    IonicPageModule.forChild(ChatUPage),
  ],
})
export class ChatUPageModule {}
