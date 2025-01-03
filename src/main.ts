import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { CustomExceptionFilter } from './shared/errors/http-exception.filter';
import { CustomHttpException } from './shared/errors/custom-exceptions';
import { errorTypes } from './shared/errors/error-types';
import { welcome } from './shared/utils/welcome';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setGlobalConfigurations(app);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port');
  await app.listen(port);
  welcome(port);
}

function setGlobalConfigurations(app: INestApplication) {
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        return new CustomHttpException(
          errorTypes.VALIDATION_ERROR,
          errors.reduce(
            (acum: string[], error) =>
              acum.concat(...Object.values(error.constraints)),
            [],
          ),
        );
      },
    }),
  );
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'"],
          imgSrc: ["'self'", 'data:'],
          connectSrc: ["'self'"],
          fontSrc: ["'self'", 'data:'],
          objectSrc: ["'none'"],
          frameSrc: ["'self'"],
        },
      },
      referrerPolicy: { policy: 'no-referrer' },
      hsts: { includeSubDomains: true, preload: true },
      noSniff: true,
      xssFilter: true,
    }),
  );
  app.use(cookieParser());
}

bootstrap();
