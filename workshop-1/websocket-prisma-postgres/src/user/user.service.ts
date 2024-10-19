import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private prisma: DatabaseService) {}

  async findOne(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async create(username: string, password: string): Promise<User> {
    // Check if the user already exists
    const existingUser = await this.findOne(username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    // Create a new user
    const newUser = await this.prisma.user.create({
      data: {
        username,
        password, // Make sure to hash the password before storing it
      },
    });

    return newUser;
  }
}
