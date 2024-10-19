import { Injectable, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt'; // Import bcrypt for password hashing

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  // This method validates the user's credentials
  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.userService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      // Validate password
      const { ...result } = user; // Exclude password from the result
      return result;
    }
    return null;
  }

  // This method handles login and user creation
  async login(userDto: Prisma.UserCreateInput) {
    // Check if user already exists
    const existingUser = await this.userService.findOne(userDto.username);
    if (existingUser) {
      // If user exists, validate the password
      const isPasswordValid = await bcrypt.compare(
        userDto.password,
        existingUser.password,
      );
      if (!isPasswordValid) {
        throw new ConflictException('Invalid credentials');
      }

      const payload = { sub: existingUser.id, username: existingUser.username };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      // If user does not exist, create a new user
      const hashedPassword = await bcrypt.hash(userDto.password, 10); // Hash the password
      const newUser = await this.userService.create(
        userDto.username,
        hashedPassword, // Save hashed password
      );

      const payload = { sub: newUser.id, username: newUser.username };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
  }
}
