import { Injectable } from '@nestjs/common';
import { PublicChannelGateway } from '../channel/public-channel.gateway';

@Injectable()
export class MessageService {
  constructor(private publicChannelGateway: PublicChannelGateway) {}

  broadcastPublicMessage(content: string) {
    this.publicChannelGateway.server.emit('message', content);
  }
}
