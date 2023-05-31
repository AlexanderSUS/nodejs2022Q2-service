import { Injectable, ConsoleLogger, LoggerService } from '@nestjs/common';
import { ConsoleLoggerOptions } from '@nestjs/common/services/console-logger.service';
import { ConfigService } from '@nestjs/config';
import LogsService from './logs.service';
import getLogLevels from 'src/utils/getLogLevels';
import { EnvironmentVariables } from 'src/config/environment-variables.interface';

@Injectable()
class CustomLogger extends ConsoleLogger implements LoggerService {
  private readonly logsService: LogsService;

  constructor(
    context: string,
    options: ConsoleLoggerOptions,
    configService: ConfigService<EnvironmentVariables>,
    logsService: LogsService,
  ) {
    const logLevel = configService.get('LOG_LEVEL', { infer: true });

    console.log('LOG LEVEL', logLevel);

    super(context, {
      ...options,
      logLevels: getLogLevels(logLevel),
    });

    this.logsService = logsService;
  }

  log(message: string, context?: string) {
    super.log.apply(this, [message, context]);

    this.logsService.saveLog({
      message,
      context,
      level: 'log',
    });
  }

  error(message: string, stack?: string, context?: string) {
    super.error.apply(this, [message, stack, context]);

    this.logsService.saveError({
      message,
      context,
      level: 'error',
    });
  }

  warn(message: string, context?: string) {
    super.warn.apply(this, [message, context]);

    this.logsService.saveLog({
      message,
      context,
      level: 'warn',
    });
  }

  debug(message: string, context?: string) {
    super.debug.apply(this, [message, context]);

    this.logsService.saveLog({
      message,
      context,
      level: 'debug',
    });
  }

  verbose(message: string, context?: string) {
    super.verbose.apply(this, [message, context]);

    this.logsService.saveLog({
      message,
      context,
      level: 'verbose',
    });
  }
}

export default CustomLogger;
