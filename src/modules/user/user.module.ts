import { Permission } from './entities/permission.entity';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { UserService } from './user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([User, Permission, Role])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
