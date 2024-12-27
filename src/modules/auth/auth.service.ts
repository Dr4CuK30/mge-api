import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

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

  async login(user: Partial<User>): Promise<any> {
    return {
      token: await this.jwtService.signAsync({ ...user }),
    };
  }
}
