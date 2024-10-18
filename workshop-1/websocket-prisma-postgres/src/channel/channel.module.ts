import { Module } from '@nestjs/common';
import { PublicChannelGateway } from './public-channel.gateway';
import { PrivateChannelGateway } from './private-channel.gateway';
import { ChannelGateway } from './channel.gateway';
import { DatabaseModule } from 'src/database/database.module';
import { WsAuthGuard } from 'src/auth/ws-auth.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  providers: [
    PublicChannelGateway,
    PrivateChannelGateway,
    ChannelGateway,
    WsAuthGuard,
  ],
  exports: [PublicChannelGateway, PrivateChannelGateway, ChannelGateway], // Export if needed elsewhere
})
export class ChannelModule {}
