// private-channel.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { WsAuthGuard } from 'src/auth/ws-auth.guard';

@WebSocketGateway({ namespace: '/private' })
export class PrivateChannelGateway {
  @WebSocketServer()
  server: Server;

  constructor(private prisma: DatabaseService) {}

  @UseGuards(WsAuthGuard) // Apply WebSocket authentication guard
  handleConnection(client: Socket) {
    console.log(`Private Client connected: ${client.id}`);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('privateMessage')
  async handlePrivateMessage(
    @MessageBody() content: string,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const userId = client.data.userId; // Assume the userId is set by the auth guard
    const channel = await this.prisma.channel.findUnique({
      where: { name: 'private' },
    });

    console.log('user name', client.data);

    // Save message to the database
    const message = await this.prisma.message.create({
      data: {
        content,
        userId: userId,
        channelId: channel.id,
      },
    });

    // Emit to this user and other connected users in the private namespace
    this.server.to(client.id).emit('privateMessage', message);
  }
}
