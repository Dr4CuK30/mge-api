import { DatabaseModule } from './database/database.module';
import databaseConfig from './environment/database.config';
import { configSchema } from './schemas/config.schema';
import cacheConfig from './environment/cache.config';
import { RedisModule } from './cache/cache.module';
import appConfig from './environment/app.config';
import jwtConfig from './environment/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig, cacheConfig],
      validationSchema: configSchema,
    }),
    DatabaseModule,
    RedisModule,
  ],
})
export class InfrastructureModule {}
