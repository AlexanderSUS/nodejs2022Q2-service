import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private logger = new Logger();

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const timestamp = new Date().toISOString();
    const path = httpAdapter.getRequestUrl(request);

    if (exception instanceof HttpException) {
      const response = ctx.getResponse<Response>();
      const statusCode = exception.getStatus();
      const message = exception.message;

      const errorLog = { statusCode, timestamp, path, message };

      const errorLogMessage = `Time ${timestamp}, method ${request.method} status ${statusCode},  message ${exception.message}`;

      this.logger.error(
        errorLogMessage,
        exception.stack,
        'HttpExceptionFilter',
      );

      response.status(statusCode).json(errorLog);
    } else {
      const ctx = host.switchToHttp();
      const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

      const responseBody = { statusCode, timestamp, path };

      this.logger.error(
        JSON.stringify(responseBody),
        exception.stack ? exception.stack : null,
        'UnhandledExceptionFilter',
      );

      httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
    }
  }
}
