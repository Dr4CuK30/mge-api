import { ExceptionData } from './custom-exceptions';
import { HttpStatus } from '@nestjs/common';

enum ErrorCode {
  USER_ALREADY_EXIST = 'USER_ALREADY_EXIST',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
}

export const errorTypes: Record<ErrorCode, ExceptionData> = {
  [ErrorCode.USER_ALREADY_EXIST]: {
    status: HttpStatus.BAD_REQUEST,
    message: 'User already exist',
    code: ErrorCode.USER_ALREADY_EXIST,
  },
  [ErrorCode.VALIDATION_ERROR]: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Body validation error',
    code: ErrorCode.VALIDATION_ERROR,
  },
  [ErrorCode.INVALID_CREDENTIALS]: {
    status: HttpStatus.UNAUTHORIZED,
    message: 'Invalid credentials',
    code: ErrorCode.INVALID_CREDENTIALS,
  },
};
