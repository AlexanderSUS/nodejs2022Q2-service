import { Module } from '@nestjs/common';
import CustomLogger from './custom-logger';
import LogsWriterService from './logs-writer.service';

@Module({
  providers: [CustomLogger, LogsWriterService],
  exports: [CustomLogger],
})
export class CustomLoggerModule {}
