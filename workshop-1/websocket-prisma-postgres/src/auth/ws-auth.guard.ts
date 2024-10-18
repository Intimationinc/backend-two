import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient();
    const authToken = client.handshake?.headers?.authorization?.split(' ')[1];

    try {
      const user = this.jwtService.verify(authToken, {
        secret: process.env.JWT_SECRET,
      });
      context.switchToHttp().getRequest().user = user;
      return true;
    } catch (error) {
      console.log(error);
      throw new WsException('Invalid credentials');
    }
  }
}
