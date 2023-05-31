import { Module } from '@nestjs/common';
import CustomLogger from './custom-logger';
import LogsService from './logs.service';

@Module({
  providers: [CustomLogger, LogsService],
  exports: [CustomLogger],
})
export class CustomLoggerModule {}
