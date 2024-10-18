import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { PublicChannelGateway } from '../channel/public-channel.gateway'; // Adjusted the import path

@Module({
  controllers: [MessageController],
  providers: [MessageService, PublicChannelGateway],
  exports: [MessageService], // Export MessageService if needed in other modules
})
export class MessageModule {}
