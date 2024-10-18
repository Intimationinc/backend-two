import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UserService, UsersController],
  exports: [UserService, UsersController],
})
export class UserModule {}
