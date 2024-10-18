import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { WsAuthGuard } from './ws-auth.guard';
import { UserModule } from '../user/user.module';
import { JwtStrategy } from './jwt.strategry';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy, WsAuthGuard],
  exports: [AuthService, JwtModule, WsAuthGuard],
})
export class AuthModule {}
