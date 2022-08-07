import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Request, Response } from 'express';
import CustomLogger from './custom-logger';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private readonly customLogger: CustomLogger,
  ) {}

  catch(exception: any, host: ArgumentsHost): void {
    if (exception instanceof HttpException) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception.getStatus();

      const errorLog = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      };

      const errorLogMessage = `Time ${errorLog.timestamp}, method ${request.method} status ${status},  message ${exception.message}`;

      this.customLogger.error(
        errorLogMessage,
        exception.stack,
        'HttpExeptionFilter',
      );

      response.status(status).json(errorLog);
    } else {
      const { httpAdapter } = this.httpAdapterHost;

      const ctx = host.switchToHttp();
      const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

      const responseBody = {
        statusCode: httpStatus,
        timestamp: new Date().toISOString(),
        path: httpAdapter.getRequestUrl(ctx.getRequest()),
      };

      this.customLogger.error(
        JSON.stringify(responseBody),
        exception.stack ? exception.stack : null,
        'UnhandledExeptionFilter',
      );

      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
  }
}
