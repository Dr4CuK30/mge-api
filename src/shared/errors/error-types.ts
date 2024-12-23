import { ExceptionData } from './custom-exceptions';
import { HttpStatus } from '@nestjs/common';

enum ErrorCode {
  USER_ALREADY_EXIST = 'USER_ALREADY_EXIST',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  ROLE_NOT_FOUND = 'ROLE_NOT_FOUND',
  INSUFIICIENT_PERMISSIONS = 'INSUFIICIENT_PERMISSIONS',
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
  [ErrorCode.USER_NOT_FOUND]: {
    status: HttpStatus.NOT_FOUND,
    message: 'User not found',
    code: ErrorCode.USER_NOT_FOUND,
  },
  [ErrorCode.ROLE_NOT_FOUND]: {
    status: HttpStatus.NOT_FOUND,
    message: 'Role not found',
    code: ErrorCode.ROLE_NOT_FOUND,
  },
  [ErrorCode.INSUFIICIENT_PERMISSIONS]: {
    status: HttpStatus.FORBIDDEN,
    message: 'Insuficient permissions',
    code: ErrorCode.INSUFIICIENT_PERMISSIONS,
  },
};
