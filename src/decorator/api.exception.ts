import { HttpException } from '@nestjs/common';

export class ApiException extends HttpException {
  constructor(statusCode: number, message: string) {
    super(message, statusCode);
  }
}