import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from '../auth/ws-auth.guard';

@WebSocketGateway({ namespace: '/' })
export class ChannelGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  async handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Public Channel Handlers
  @SubscribeMessage('joinPublic')
  handleJoinPublic(@ConnectedSocket() client: Socket): void {
    client.join('public');
    console.log(`Client ${client.id} joined public channel`);
    this.server
      .to('public')
      .emit('publicMessage', `Client ${client.id} joined public channel`);
  }

  @SubscribeMessage('publicMessage')
  handlePublicMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(
      `Received message on public channel from ${client.id}: ${message}`,
    );
    this.server.to('public').emit('publicMessage', message);
  }

  // Private Channel Handlers (with authentication)
  @UseGuards(WsAuthGuard)
  @SubscribeMessage('joinPrivate')
  handleJoinPrivate(@ConnectedSocket() client: Socket): void {
    client.join('private');
    console.log(`Client ${client.id} joined private channel`);
    this.server
      .to('private')
      .emit('privateMessage', `Client ${client.id} joined private channel`);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('privateMessage')
  handlePrivateMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(`Received private message from ${client.id}: ${message}`);
    this.server.to('private').emit('privateMessage', message);
  }
}
