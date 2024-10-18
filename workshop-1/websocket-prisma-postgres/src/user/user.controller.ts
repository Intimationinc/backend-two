// src/users/users.controller.ts

import { Controller, Get, Param } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Controller('users')
export class UsersController {
  constructor(private readonly databaseService: DatabaseService) {}
  @Get()
  getAllUsers() {
    // Logic to return all users
    return this.databaseService.user.findMany({});
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    // Logic to return a user by ID
    return { id, name: 'Sample User' };
  }
}
