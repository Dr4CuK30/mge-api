import { CustomHttpException } from 'src/shared/errors/custom-exceptions';
import { errorTypes } from 'src/shared/errors/error-types';
import { UserService } from '../user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(username: string, pass: string): Promise<any> {
    const user = await this.usersService.find({ username });
    if (!user || !bcrypt.compareSync(pass, user.passwordHash)) {
      throw new CustomHttpException(
        errorTypes.INVALID_CREDENTIALS,
        'username or password is incorrect',
      );
    }
    delete user.passwordHash;
    return {
      token: await this.jwtService.signAsync({ ...user }),
    };
  }
}
