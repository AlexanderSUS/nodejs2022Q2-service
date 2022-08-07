import { LogLevel } from '@nestjs/common/services/logger.service';

function getLogLevels(logLevel: number): LogLevel[] {
  switch (logLevel) {
    case 1:
      return ['log'];
    case 2:
      return ['log', 'warn'];
    case 3:
      return ['log', 'warn', 'error'];
    case 4:
      ['log', 'warn', 'error', 'debug'];
    case 5:
      return ['error', 'warn', 'log', 'verbose', 'debug'];
    default:
      return ['log'];
  }
}

export default getLogLevels;
