import { CustomCacheInterceptor } from './shared/interceptors/custom-cache.interceptor';
import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { TransferModule } from './modules/transfer/transfer.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';

@Module({
  imports: [InfrastructureModule, UserModule, AuthModule, TransferModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CustomCacheInterceptor,
    },
  ],
})
export class AppModule {}
