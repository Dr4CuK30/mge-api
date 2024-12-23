import { CustomHttpException } from 'src/shared/errors/custom-exceptions';
import { errorTypes } from 'src/shared/errors/error-types';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    if (!username || !password) {
      throw new CustomHttpException(
        errorTypes.INVALID_CREDENTIALS,
        'username or password is incorrect',
      );
    }
    const user = await this.authService.validate(username, password);
    if (!user) {
      throw new CustomHttpException(
        errorTypes.INVALID_CREDENTIALS,
        'username or password is incorrect',
      );
    }
    return user;
  }
}
