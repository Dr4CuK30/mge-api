import { CustomHttpException } from 'src/shared/errors/custom-exceptions';
import { SALT_ROUNDS } from 'src/shared/constants/general.constants';
import { errorTypes } from 'src/shared/errors/error-types';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async find(data: Partial<User>) {
    return this.userRepository.findOneBy(data);
  }

  async createUser(data: CreateUserDto) {
    const alreadyExist = await this.userRepository.findOne({
      where: [{ email: data.email }, { username: data.username }],
    });
    if (alreadyExist) {
      throw new CustomHttpException(
        errorTypes.USER_ALREADY_EXIST,
        'email or username already used',
      );
    }
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const hashedPassword = bcrypt.hashSync(data.password, salt);
    const userCreated = this.userRepository.create({
      ...data,
      passwordHash: hashedPassword,
    });
    await this.userRepository.save(userCreated);
    delete userCreated.passwordHash;
    return userCreated;
  }
}
