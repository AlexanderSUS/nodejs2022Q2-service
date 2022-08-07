import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import CustomLogger from './custom-logger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly customLogger: CustomLogger) {}

  catch(exception: HttpException, host: ArgumentsHost) {
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
  }
}
