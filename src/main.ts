import { welcome } from './shared/utils/welcome';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');
  await app.listen(port);
  welcome(port);
}
bootstrap();