import { HttpException } from '@nestjs/common';

export interface ExceptionData {
  message: string;
  status: number;
  code: string;
}

export class CustomHttpException extends HttpException {
  public code: string;
  public description?: string | object;
  constructor(type: ExceptionData, description?: string | object) {
    super(type.message, type.status);
    this.code = type.code;
    this.description = description;
  }
}
