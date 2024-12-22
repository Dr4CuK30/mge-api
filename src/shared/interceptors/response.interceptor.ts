import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const statusCode: number = context.switchToHttp().getResponse().statusCode;
    return next.handle().pipe(
      map((data) => ({
        status: statusCode,
        data,
        timestamp: new Date().toISOString(),
        error: null,
      })),
    );
  }
}
