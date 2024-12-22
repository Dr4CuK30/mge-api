import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const port = this.configService.get<number>('database.port');
    const host = this.configService.get<string>('database.host');
    const username = this.configService.get<string>('database.username');
    const password = this.configService.get<string>('database.password');
    const database = this.configService.get<string>('database.database');
    return {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      autoLoadEntities: true,
      synchronize: true,
    };
  }
}
