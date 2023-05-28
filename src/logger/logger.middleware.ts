import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import LogsService from './logs.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LogsService) {}
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { originalUrl, method, query, body } = request;

    console.log('BODY', { ...body });

    response.on('finish', () => {
      const { statusCode } = response;
      // const contentLength = response.get('content-length');

      const log = `Time: ${new Date().toISOString()}, ${method} ${originalUrl} query=${JSON.stringify(
        query,
      )} body=${JSON.stringify(body)}. Response: status code ${statusCode}`;

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
