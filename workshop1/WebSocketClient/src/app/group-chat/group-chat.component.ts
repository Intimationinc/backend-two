import { Component, OnInit } from '@angular/core';
import { ChatService, IGroup } from '../chat.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-group-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './group-chat.component.html',
  styleUrl: './group-chat.component.scss',
})
export class GroupChatComponent implements OnInit {
  groups: IGroup[] = [];
  groupName: string = '';
  message: string = '';
  selectedGroup!: IGroup;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.groups$.subscribe(
      (response) => (this.groups = [...response])
    );
  }

  onJoinOrCreateGroup() {
    this.chatService.JoinGroup('test', this.groupName);
  }

  onGroupMessageSend() {
    this.chatService.SendGroupMessage(
      'test',
      this.message,
      this.selectedGroup.name
    );
  }
}
