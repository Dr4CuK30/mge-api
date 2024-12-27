import { OrganizationalUnit } from './entities/organizational-unit.entity';
import { TransferController } from './transfer.controller';
import { Transfer } from './entities/transfer.entity';
import { TransferService } from './transfer.service';
import { Vehicle } from './entities/vehicle.entity';
import { Project } from './entities/project.entity';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizationalUnit, Project, Transfer, Vehicle]),
    UserModule,
  ],
  controllers: [TransferController],
  providers: [TransferService],
})
export class TransferModule {}
