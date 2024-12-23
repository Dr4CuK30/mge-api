import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { UpdateRolesDto } from '../auth/dtos/update-roles.dto';
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

  @Put('roles')
  updateUserRoles(@Body() { username, roles }: UpdateRolesDto) {
    return this.userService.updateUserRoles(username, roles);
  }
}
