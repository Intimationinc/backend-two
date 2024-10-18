import { Controller, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post('send-public-message')
  async sendPublicMessage(@Body() messageDto: { content: string }) {
    return this.messageService.broadcastPublicMessage(messageDto.content);
  }
}
