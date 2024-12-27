import { MILLISECONDS } from 'src/shared/constants/time.constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const host = configService.get('REDIS_HOST');
        const port = configService.get('REDIS_PORT');
        const store = await redisStore({
          socket: {
            host,
            port,
          },
          ttl: MILLISECONDS.ONE_MINUTE,
        });
        return { store, ttl: MILLISECONDS.ONE_MINUTE };
      },
    }),
  ],
})
export class RedisModule {}
