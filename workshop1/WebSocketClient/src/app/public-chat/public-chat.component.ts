import { Component } from '@angular/core';
import { ChatService, IMessage } from '../chat.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-public-chat',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './public-chat.component.html',
  styleUrl: './public-chat.component.scss',
})
export class PublicChatComponent {
  messages: IMessage[] = [];
  activeUsers: string[] = [];
  message: string = '';

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.chatService.messages$.subscribe(
      (response) => (this.messages = [...response])
    );
  }

  onPublicMessageSend() {
    this.chatService.SendPublicMessage(this.message);
  }
}
