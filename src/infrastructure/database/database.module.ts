import { ConfigModule, ConfigService } from '@nestjs/config';
import { dataSourceFactory } from './connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './db';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfigService,
      dataSourceFactory,
    }),
  ],
})
export class DatabaseModule {}
