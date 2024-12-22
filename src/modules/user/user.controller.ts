import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';

@Controller({ version: '1', path: 'user' })
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getUser() {
    return { message: 'Hello World' };
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }
}
