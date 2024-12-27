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
        const url = configService.get('REDIS_URL');
        const config: any = {};
        if (url) {
          config.url = url;
        } else {
          const host = configService.get('REDIS_HOST');
          const port = configService.get('REDIS_PORT');
          config.socket = { host, port };
        }

        const store = await redisStore({
          ...config,
          ttl: MILLISECONDS.ONE_MINUTE,
        });
        return { store, ttl: MILLISECONDS.ONE_MINUTE };
      },
    }),
  ],
})
export class RedisModule {}
