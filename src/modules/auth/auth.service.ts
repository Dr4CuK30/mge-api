import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validate(username: string, pass: string): Promise<Partial<User>> {
    const user = await this.usersService.findUser({ username });
    if (!user || !bcrypt.compareSync(pass, user.passwordHash)) {
      return null;
    }
    delete user.passwordHash;
    return user;
  }

  async login(user: Partial<User>, response: Response): Promise<any> {
    const token = await this.jwtService.signAsync({ ...user });
    response.cookie('Authentication', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    return { message: 'Login successful' };
  }
}
