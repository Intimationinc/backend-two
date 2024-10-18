import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto) {
    try {
      console.log('login cred', loginDto);
      // Attempt to log in the user, which will create the user if not found
      return await this.authService.login(loginDto);
    } catch (error) {
      // Handle specific error types for clarity
      if (error instanceof ConflictException) {
        throw new ConflictException('Username already exists'); // Username exists error
      }
      // For other errors, you can throw a generic UnauthorizedException
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
