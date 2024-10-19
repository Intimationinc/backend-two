import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');
  private clientUsernames: Map<string, string> = new Map();

  private generateRandomName(id: string): string {
    const adjectives = [
      'Happy',
      'Sleep',
      'Grumpy',
      'Bashf',
      'Sneez',
      'Dopey',
      'Docet',
    ];
    const nouns = [
      'Elepha',
      'Pengu',
      'Kangar',
      'Hippo',
      'Giraff',
      'Monkey',
      'Zebra',
    ];
    const randomAdjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const shortId = id.slice(-3); // Get the last 3 characters of the ID
    return `${randomAdjective}${randomNoun}${shortId}`;
  }

  handleConnection(client: Socket) {
    const username = this.generateRandomName(client.id);
    this.clientUsernames.set(client.id, username);
    this.logger.log(`Client connected: ${client.id} as ${username}`);
    client.emit('username', username);
  }

  handleDisconnect(client: Socket) {
    const username = this.clientUsernames.get(client.id);
    this.clientUsernames.delete(client.id);
    this.logger.log(`Client disconnected: ${client.id} as ${username}`);
  }

  @SubscribeMessage('public-message')
  handlePublicMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): void {
    const username = this.clientUsernames.get(client.id) || 'Anonymous';
    this.server.emit('public-message', {
      id: client.id,
      username,
      text: message,
      timestamp: new Date(),
    });
  }
}
