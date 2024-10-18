import { Routes } from '@angular/router';
import { PublicChatComponent } from './public-chat/public-chat.component';
import { PrivateChatComponent } from './private-chat/private-chat.component';
import { GroupChatComponent } from './group-chat/group-chat.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'public',
    pathMatch: 'full',
  },
  {
    path: 'public',
    component: PublicChatComponent,
  },
  {
    path: 'private',
    component: PrivateChatComponent,
  },
  {
    path: 'group',
    component: GroupChatComponent,
  },
];
