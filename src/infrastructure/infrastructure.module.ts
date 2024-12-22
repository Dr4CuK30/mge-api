import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './environment/database.config';
import { dataSourceFactory } from './database/connection';
import { configSchema } from './schemas/config.schema';
import { TypeOrmConfigService } from './database/db';
import appConfig from './environment/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      validationSchema: configSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeOrmConfigService,
      dataSourceFactory,
    }),
  ],
  controllers: [],
  providers: [],
})
export class InfrastructureModule {}
