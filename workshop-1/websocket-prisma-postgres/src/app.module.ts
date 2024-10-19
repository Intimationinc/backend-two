import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';
import { ChannelModule } from './channel/channel.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { CacheControlMiddleware } from './middlewares/cache-control.middleware';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    MessageModule,
    UserModule,
    ChannelModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CacheControlMiddleware).forRoutes('/users*'); // Apply to all user-related routes
  }
}
