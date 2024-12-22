import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { CustomHttpException } from './custom-exceptions';
import { Request, Response } from 'express';

@Catch(CustomHttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: CustomHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      status,
      data: null,
      error: {
        message: exception.message,
        code: exception.code,
        description: exception.description,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    });
  }
}
