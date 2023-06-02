import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { originalUrl, method, query, body } = request;

    response.on('finish', () => {
      const log = `Time: ${new Date().toISOString()}, ${method} ${originalUrl} query=${JSON.stringify(
        query,
      )} body=${JSON.stringify(body)}, status code ${response.statusCode}`;

      this.logger.log(log);
    });

    next();
  }
}
