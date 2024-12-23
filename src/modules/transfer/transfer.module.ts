import { OrganizationalUnit } from './entities/organizational-unit.entity';
import { TransferController } from './transfer.controller';
import { Transfer } from './entities/transfer.entity';
import { Vehicle } from './entities/vehicle.entity';
import { Project } from './entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrganizationalUnit, Project, Transfer, Vehicle]),
  ],
  controllers: [TransferController],
})
export class TransferModule {}
