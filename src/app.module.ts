import { InfrastructureModule } from './infrastructure/infrastructure.module';
import { TransferModule } from './modules/transfer/transfer.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [InfrastructureModule, UserModule, AuthModule, TransferModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
