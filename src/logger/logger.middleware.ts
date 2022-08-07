import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import LogsService from './logs.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LogsService) {}
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { originalUrl, method, query, body } = request;

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      const log = `${method} ${originalUrl} ${query} ${body}. Response: status code ${statusCode}, content length: ${contentLength}`;

      this.logger.log(log);
      this.loggerService.saveLog({
        context: 'LOG',
        level: 'HTTP',
        message: log,
      });
    });

    next();
  }
}
