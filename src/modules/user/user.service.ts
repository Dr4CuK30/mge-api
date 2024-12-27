import { CustomHttpException } from 'src/shared/errors/custom-exceptions';
import { SALT_ROUNDS } from 'src/shared/constants/general.constants';
import { errorTypes } from 'src/shared/errors/error-types';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async findUser(data: Partial<User>) {
    return this.userRepository.findOne({
      where: data,
      relations: [
        'roles',
        'roles.permissions',
        'projects',
        'projects.organizationalUnits',
        'organizationalUnits',
      ],
    });
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

  async updateUserRoles(username: string, roles: string[]) {
    const user = await this.findUser({ username });
    if (!user) {
      throw new CustomHttpException(
        errorTypes.USER_NOT_FOUND,
        'user not found',
      );
    }
    const rolesEntities = await this.roleRepository.findBy({
      name: In(roles),
    });
    if (rolesEntities.length !== roles.length) {
      throw new CustomHttpException(
        errorTypes.ROLE_NOT_FOUND,
        'some role was not found',
      );
    }
    user.roles = rolesEntities;
    await this.userRepository.save(user);
    return rolesEntities;
  }
}
